#!/usr/bin/env nix-shell

let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-23.11";
  pkgs = import nixpkgs { config = {}; overlays = []; };

  # CKAN version
  ckanVersion = "2.9.9";

  # Python Interpreter
  python = pkgs.python310Full;
in

pkgs.mkShell {
  buildInputs = [
    python

    (pkgs.python310Full.withPackages (ps: with ps; [
      setuptools
      pip
      wheel
      virtualenv
    ]))
  ];

  shellHook = ''
    # Set up virtual environment
    python -m venv .venv
    source .venv/bin/activate

    # Install CKAN from source
    pip install -e git+https://github.com/ckan/ckan.git@ckan-${ckanVersion}#egg=ckan

    # upgrade pyyaml and webassets for target version of CKAN
    sed -i 's/pyyaml==5.4.1/pyyaml>=6.0.1/g'                .venv/src/ckan/requirements.txt
    sed -i 's/webassets==0.12.1/webassets>=2.0/g'           .venv/src/ckan/requirements.txt
    sed -i 's/zope.interface==4.3.2/zope.interface>=6.2/g'  .venv/src/ckan/requirements.txt
    sed -i 's/psycopg2==2.9.3/#psycopg2==2.9.9/g'            .venv/src/ckan/requirements.txt   
    sed -i 's/lxml==4.6.3/lxml==5.1.0/g'                    .venv/src/ckan/requirements.txt
    sed -i 's/pytz==2016.7/pytz==2024.1/g'                  .venv/src/ckan/requirements.txt

    pip install -r .venv/src/ckan/requirements.txt

    # Install CKAN extensions
    pip install -r ./conf/pip/requirements-dev.txt
    pip install -r ./conf/pip/requirements-ext.txt

    # Install `ckanext-ehaportal` in editable mode
    pip install -e .
  '';
}

