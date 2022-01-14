# Rick and Morty API frontend test in Vuejs

Based on [typescript-dev-kit](https://github.com/openizr/typescript-dev-kit).


## Project structure

### `frontend`

Contains the front-end (in-browser UI) codebase.

- `frontend/public`: public assets, served statically (HTML, JS, CSS, fonts, images, ...)
- `frontend/src/styles`: app-specific design SASS implementation
- `frontend/src/images`: app-specific static graphic assets
- `frontend/src/scripts/components`: UI components Vue implementation
- `frontend/src/scripts/containers`: UI containers Vue implementation
- `frontend/src/scripts/pages`: UI pages Vue implementation
- `frontend/src/scripts/store`: store modules implementation


## Usage

/!\ [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) must be installed on your machine. /!\

At the root of this repository:

1. `cp .env.example` `.env`
2. Complete/change your `.env` file's values if necessary
3. `docker-compose up` (this might take a little while to start-up on the very first time)

You can then navigate through the UI in your browser (`http://localhost:[FRONTEND_PORT])`), or
call the back-end API (`http://localhost:[BACKEND_PORT])`)
