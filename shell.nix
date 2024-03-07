#!/usr/bin/env nix-shell

let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-23.11";
  pkgs = import nixpkgs { config = {}; overlays = []; };

  # CKAN version
  ckanVersion = "2.10.3";

  # Python Interpreter
  python = pkgs.python310Full;
in

pkgs.mkShell {
  buildInputs = [
    python
    pkgs.proj

    (pkgs.python310Full.withPackages (ps: with ps; [
      setuptools
      pip
      wheel
      virtualenv
    ]))
  ];

  PROJ_INCDIR = "${pkgs.proj.dev}/include/proj";

  shellHook = ''
    # Set up virtual environment
    python -m venv .venv
    source .venv/bin/activate

    # Install CKAN from source
    pip install -e git+https://github.com/ckan/ckan.git@ckan-${ckanVersion}#egg=ckan

    # upgrade pyyaml and webassets for target version of CKAN
    sed -i 's/psycopg2==2.9.3/psycopg2-binary==2.9.9/g'  .venv/src/ckan/requirements.txt   
    sed -i 's/lxml==4.9.1/lxml==5.1.0/g'                 .venv/src/ckan/requirements.txt

    pip install -r .venv/src/ckan/requirements.txt

    # Install CKAN extensions
    pip install -r ./requirements-ext.txt
    pip install -r ./requirements-dev.txt

    # Install `ckanext-ehaportal` in editable mode
    pip install -e .
  '';
}

