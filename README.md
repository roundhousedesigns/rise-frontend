# RISE

[![DeepScan grade](https://deepscan.io/api/teams/14424/projects/24864/branches/769714/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=14424&pid=24864&bid=769714)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/64f466be6e654cd2a2bb790971fb07ef)](https://app.codacy.com/gh/roundhousedesigns/rise-frontend/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## Tech Stack

The front end portion of RISE is built using:

- Vite
- React
- GraphQL

## Development Setup

### Node Setup

1. Node v19.4.0 or above is required. We recommend using `nvm` to manage node
versioning control. For help installing and using nvm, see [NVM Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
2. Install v19.4.0 of node with the command:

         nvm install 19.4.0

    Confim that v19.4.0 or above is running (an arrow will point to current version)
    with the command:

         nvm ls

    If an incorrect version is selected, change to v19.4.0 with the command:

         nvm use 19.4.0

### Dev Setup

1. Clone the dev branch with the command:

        git clone -b dev git@github.com:roundhousedesigns/rise-frontend.git

2. At the root of the project directory, run:

         yarn install

### Environment Variables Setup

1. Create a `.env` file in the root project directory:
2. Add the following information:

        VITE_FRONTEND_URL = http://localhost:3000
        VITE_BACKEND_URL = (backend server URL)
        VITE_RECAPTCHA_SITE_KEY = (your recaptcha site key)

    _Note:_ ask a team member for VITE_BACKEND_URL and VITE_RECAPTCHA_SITE_KEY specifics

### Development Workflow

_Branch Naming Convention:_ Name a branch by name/ticket-name. For example: `michael/add-readme-steps`

1. From the dev branch, create a new feature branch:

         git checkout -b <your-branch-name>

2. To start local development, run:

         yarn dev

    and go to: `http://localhost:3000`

### How to make a pull request

1. From your feature branch, run `git pull origin dev` and resolve any merge conflicts

2. After commiting and pushing your branch, click on a Pull requests tab on
GitHub and create a draft pull request. Make sure to select "base:" as `dev`
and "compare:" as `<your-branch-name>`

   - In the comment section, document exactly what you did and why you did it.
Include screen capture and testing steps if applicable
   - Double check the diff
   - Make further changes locally, if any mistakes are found and commit again

## Production Builds

- `yarn build` to build for production
- `yarn preview` to serve a production preview

---
Copyright (c) 2024 Maestra Music and Roundhouse Designs. All rights reserved.
