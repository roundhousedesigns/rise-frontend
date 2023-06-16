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
*   [Set up your environment variables](#envvars)
*   `yarn dev` to spin up a local dev server at `http://localhost:3000`, or wherever you've specified in your `package.json`.
*   `yarn build` to build for production
*   `yarn preview` to serve a production preview

## Envvars

Google reCAPTCHA is heavily integrated with the frontend, and **even for development**, you will need to supply your own reCAPTCHA key. You can set up one here: (<https://www.google.com/recaptcha/about/>). Be sure to add the `localhost` domain during setup if you're running locally. You'll want to set up a **v3 (Score-based) key**, and you're going to use the *Site Key*.

    VITE_FRONTEND_URL = http://localhost:3000 (or your local dev server)
    VITE_BACKEND_URL = https://dev.risetheatre.org/graphql
    VITE_RECAPTCHA_SITE_KEY = (your recaptcha site key)
