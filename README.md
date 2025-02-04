# RISE

[![DeepScan grade](https://deepscan.io/api/teams/14424/projects/24864/branches/769714/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=14424&pid=24864&bid=769714)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/64f466be6e654cd2a2bb790971fb07ef)](https://app.codacy.com/gh/roundhousedesigns/rise-frontend/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## Tech Stack

The front end portion of RISE is built using:

- Vite
- TypeScript
- React
- GraphQL
- Chakra UI

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.12.0 or above)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [nvm](https://github.com/nvm-sh/nvm) for Node version management

### Node Setup

1.  Node v20.12.0 or above is required. We recommend using `nvm` to manage node
    versioning control. For help installing and using nvm, see [NVM Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)

2.  Install v20.12.0 of node with the command:

    `nvm install 20.12.0`

    Confirm that v20.12.0 or above is running (an arrow will point to the current version)
    with the command:

    `nvm ls`

    If an incorrect version is selected, change to v20.12.0 with the command:

    `nvm use 20.12.0`

### Dev Setup

_Note:_ The main `dev` branch is now the `preview` branch. Use `v1.2-dev` as the base branch.

1.  Clone the `v1.2-dev` branch with the command:

    `git clone -b v1.2-dev git@github.com:roundhousedesigns/rise-frontend.git`

2.  At the root of the project directory, run:

    `yarn install`

### Environment Variables Setup

1.  Create a `.env` file in the root project directory:
2.  Add the following information:

    ```
       VITE_FRONTEND_URL = http://localhost:3000
       VITE_BACKEND_URL = (backend server URL)
       VITE_RECAPTCHA_SITE_KEY = (your recaptcha site key)
    ```

    _Note:_ ask a team member for VITE_BACKEND_URL and VITE_RECAPTCHA_SITE_KEY specifics.

### Development Workflow for v1.2

1.  Create a new feature branch from the `v1.2-dev` branch:

    `git checkout v1.2-dev && git checkout -b <your-branch-name>`

2.  To start local development, run:

    `yarn dev`

    and go to: [http://localhost:3000](http://localhost:3000)

### How to make a pull request

1. Add a section to the top of the `changelog.md` file with the title of your branch and the changes you made.

2. From your feature branch, run `git pull origin v1.2-dev` and resolve any merge conflicts

3. After committing and pushing your branch, click on a Pull requests tab on
   GitHub and create a draft pull request. Make sure to select "base:" as `v1.2-dev`
   and "compare:" as `<your-branch-name>`

   - In the comment section, document exactly what you did and why you did it.
   - Include screen capture and testing steps if applicable
   - Double check the diff
   - Make further changes locally, if any mistakes are found and commit again

## Production Builds

- `yarn build` to build for production
- `yarn preview` to serve a production preview

---

Copyright (c) 2024-2025 Maestra Music and Roundhouse Designs. All rights reserved.
