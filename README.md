# Rick and Morty Vue Frontend

**Uses the [Rick and Morty API](https://rickandmortyapi.com/documentation) to display characters in a Vue frontend UI**

## Host bundled files on a server (Apache...)
- copy the /dist folder content to a web server directory
- visit the index.html page

## Install, self host and develop with Docker
- **you'll need [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) installed on your system.** That's all.
- clone the repo
- ```cd``` to your repo then ```cp .env.example .env```
- update the .env variables depending on your needs
- run ```docker-compose up```

### Docker image, server and bundler are based on [Veronique](https://github.com/digivorefr/veronique)
