[![Tests](https://github.com/eHealthAfrica/ckanext-ehaportal/workflows/Tests/badge.svg?branch=main)](https://github.com/eHealthAfrica/ckanext-ehaportal/actions)

# ckanext-ehaportal

A CKAN extension with customisations for the eHealth Africa Data Portal.


## Installation

To install the extension

1. Activate your CKAN virtualenv, for example

   `. ${CKAN_VENV}/bin/activate`

1. Install `ckanext-ehaportal` in edit mode

   `pip install -e .`

1. Install dependencies

   ```sh 
   # install direct requirements
   pip install -r ./requirements.txt

   # install dev requirements
   pip install -r ./requirements-dev.txt
   ```

1. Add `ehaportal` to the `ckan.plugins` setting in your CKAN config file


## Config settings

None at present.


## Development Setup
### Pre-requisites

- [Homebrew](https://brew.sh)
- [Task](https://taskfile.dev/)
- [Nix](https://nixos.org/)
- [Libmagic](https://formulae.brew.sh/formula/libmagic)

**Optional**:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Setup dev environment 

1. Install all pre-requisites listed above you if don't already have them installed


1. Install CKAN and all dependent extension from source into a `Nix` shell from the project root directory as follows:
   
   ```sh 
   # setu p dev env using nix 
   nix-shell
   ```

   Running `nix-shell` starts up an isolated `Nix` shell and does the following:
   - Creates a virtualenv named `.venv` in the project root directory
   - Installs `CKAN` in edit mode into the virtualenv. Source becomes available in `.venv/src/ckan`
   - Installs the following extensions required to run the eHealth Data Portal into the virtualenv
     - [ckanext-envvars](git+https://github.com/okfn/ckanext-envvars.git@v0.0.3)
     - [ckanext-odata](git+https://github.com/eHealthAfrica/ckanext-odata.git)
     - [ckanext-s3filestore](git+https://github.com/keitaroinc/ckanext-s3filestore.git@v1.0.0)
     - [ckanext-googleanalytics](git+https://github.com/ckan/ckanext-googleanalytics.git@v2.3.0)
     - [ckanext-geoview](git+https://github.com/ckan/ckanext-geoview.git@v0.0.19)
     - [ckanext-spatial](git+https://github.com/eHealthAfrica/ckanext-spatial.git@e59a295431247fcd605fe55bb4fd9a2ecfc28d2b)
     - [ckanext-harvest](git+https://github.com/ckan/ckanext-harvest.git@v1.5.6)
     - [ckanext-geonetwork](git+https://github.com/geosolutions-it/ckanext-geonetwork.git)
   - Installs `ckanext-ehaportal` (this extension) in edit mode.

1. Run third-party services

   CKAN depends on a number of third-party services like the Datapusher, PostgreSQL database, Apache Solr, and Redis. These can be installed locally so that they're available system wide or spun up using Docker without having to install any of the listed services directly on the system.

   See the official CKAN documentation [here]() if you want to install the services locally. The instructions that follow outline steps for running the services using Docker.

   #### Docker-based setup

   **Note: Do not perform any of the following using the nix-shell**

   - Open a new bash shell
   - Obtain the necessary Docker configurations by cloning `docker-ehaportal` from GitHub into a **.var/docker** folder inside the project root direct as thus:

     `task init-services`

     This also creates a copy of `./.var/docker/env.sample` into the root project directy named `.env`. This can also be achieved by running:

     `task env-file`

   - Go through `.env` file and perform necessary updates like assigning values to the keys under the **S3 Filestore** section.
   - Build Docker images for required services with

     `task build-services`

   - Run Docker containers from built images with

     `task run-services`

1. Run CKAN

   Return to the previous **nix-shell** and run the following commands:

   ```sh 
   # creates the CKAN configuration file (ckan.ini)
   (nix-shell) task ini-file

   # run CKAN
   (nix-shell) task run
   ```

## Tests
...


## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

Licensed under the Apache License, Version 2.0 (the **“License”**); you may not use this file except in compliance with the **License**.

You may obtain a copy of the **License** at <http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software distributed under the **License** is distributed on an **“AS IS”** BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the **License** for the specific language governing permissions and limitations under the **License**.

