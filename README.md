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

1. Make sure Node is installed. It can be downloaded here: [NodeJS](https://nodejs.org/en/download).
2. Node v19.4.0 or above is required. We recommend using `nvm` to manage node versioning control.\
    For help installing and using nvm, see this [NVM Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
3. Install v19.4.0 of node with the command:

         nvm install 19.4.0

    Confim that v19.4.0 or above is running (an arrow will point to current version) with the command:

         nvm ls

    If an incorrect version is selected, change to v19.4.0 with the command:

         nvm use 19.4.0

### Dev Setup

1. Clone the dev branch with the command:

        git clone -b dev git@github.com:roundhousedesigns/rise-frontend.git

2. At the root of the project directory, run:

         yarn install

    _Note:_ To install yarn, see [How to install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

### Environment Variables Setup

_Note:_ `.env` already included in `.gitignore`

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

### How to make pull request

1. From your feature branch, run `git pull origin dev` and resolve any merge conflicts

2. After commiting and pushing your branch, click on a Pull requests tab on GitHub and create a draft pull request. Make sure to select "base:" as `dev`and "compare:" as `<your-branch-name>`

   _Note:_ Your first commit message should describe the main objective (don’t get too specific). i.e. - `fix button border overlapping in mobile view`

   - In the comment section, document exactly what you did and why you did it. Include screen capture and testing steps if applicable
   - Double check the diff
   - Make further changes locally, if any mistakes are found and commit again

3. When the pull request is ready for a review, click on "Pull requests" tab. In the merge box, click "Ready for review" button

## Production Builds

- `yarn build` to build for production
- `yarn preview` to serve a production preview
