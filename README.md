# RISE

[![DeepScan grade](https://deepscan.io/api/teams/14424/projects/23596/branches/718895/badge/grade.svg)](https://deepscan.io/dashboard#view=project\&tid=14424\&pid=23596\&bid=718895)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/64f466be6e654cd2a2bb790971fb07ef)](https://app.codacy.com/gh/roundhousedesigns/rise-frontend/dashboard?utm_source=gh\&utm_medium=referral\&utm_content=\&utm_campaign=Badge_grade)

## This is the main interface for the RISE Theatre Directory

Current tooling:

*   Node ^19.4.0
*   Vite
*   React
*   GraphQL

## Development

*   Clone the `dev` branch
*   Run `yarn install`
*   [Set up your environment variables](#envvars).
    *   If you're working with us and are using the Roundhouse development backend, he can provide the `VITE_BACKEND_URL` and `VITE_RECAPTCHA_SITE_KEY` values.
    *   If you're not sure if this is you, this is you.
*   `yarn dev` to spin up a local dev server at `http://localhost:3000`, or wherever you've specified in your `package.json`.
*   `yarn build` to build for production
*   `yarn preview` to serve a production preview

## Envvars

    VITE_FRONTEND_URL = http://localhost:3000 (or your local dev server)
    VITE_BACKEND_URL = your-graphql-https-endpoint
    VITE_RECAPTCHA_SITE_KEY = someCrazySiteKey
