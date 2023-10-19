# News-APP - Frontend(Vue 3) Application

This project is built using Vue.js.

This README document offers essential information regarding the project's structure, prerequisites, and guidance for running the application on your local machine.

### Features

- Vue Router Included.
- Vuetify.
- Modules/Components organized across folders.
- Base pages.
- Pre-configured with code quality tools: Eslint-airbnb-base.
- Code Follow the Airbnb javascript style.

### Directory Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **build/**                        | Compiled source files will be placed here. |
| **public/**                       | Static assets (fonts, css, js, img). |
| **src/**                          | Source files. |
| **src/components**                | Vue components including shared (common) components. |
| **src/components/common**         | Dynamic Layout Components. |
| **src/assets**                    | Static assets like images and fonts. |
| **src/router**                    | Application routes. |

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer.

### Installation

- Install project dependencies — `npm install`.
- Create `.env` file - `cp env.example .env`.
- Launch the app — `npm run serve`, it will become available at [http://localhost:8080](http://localhost:8080/).
- Create Docker Image RUN - `docker build -t news-app .`.
- RUN Dev server on docker - `docker run -it -p 8080:80 news-app`
- RUN TestCase - `npm run test:unit`

### Available Scripts

- `npm run serve`
- `npm run build`
- `npm run lint`