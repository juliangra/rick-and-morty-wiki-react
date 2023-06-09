# Rick and Morty Wiki - IT2810 (React)

## Description

This project is full-stack web application about Rick and Morty characters.

As a user, you can search and filter characters. As a logged in user, you can rate a given character. You can also see a leaderboard of all users' number of ratings, sorted in ascending or descending order.

## Screenshots


### Splash screen
![Splash screen](docs/images/splash.png)

### Characters overview
![Characters overview](docs/images/characters.png)

### Filtering characters
![Filtering characters](docs/images/filtering.png)

### Character view
![Character view](docs/images/character_view.png)

### Leaderboard
![Leaderboard](docs/images/leaderboard.png)

## Developer Information

Developed by Sebastian Sole, Julian Grande and Magnus Rødseth.

## Documentation

Please read the [`docs` documentation](/docs/README.md).

Note that we have extracted the section about universal design, web accessibility and sustainable development from the `docs` documentation and placed in a separate file: [`docs/ACCESSIBILITY.md`](/docs/ACCESSIBILITY.md).

## Tech stack and libraries

### `frontend`

- React
- TypeScript
- Mantine, a library with UI components and useful hooks
- Zod Schema Validation
- Apollo GraphQL client
- Apollo global state management
- Jest
- JSON Web Token, for handling the user session
- React Testing Library
- Cypress, for end-to-end testing

### `backend`

- Express, a web server
- TypeScript
- GraphQL
- JSON Web Token, for handling the user session
- Prisma Client, a client for interacting with the PostgreSQL database
- Rollup, for transpiling and bundling the application to JavaScript

### Database

- PostgreSQL, a relational database running locally using `docker-compose`

## Running the application

### Running `frontend`

```sh
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm i

# Start application
npm start
```

### Running `backend`

```sh
# Navigate to the backend directory
cd backend

# Install dependencies
npm i

# Start development database (Local PostgreSQL instance)
docker-compose up -d

# Start application in development mode
npm run dev

# or

# Compile and start application in production mode
npm start
```

### Connecting to the database

Ensure you have a `.env` file located in the `backend/.env` directory with the following contents:

```sh
PORT=8081
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"
```

The `.env` file is not part of the `.gitignore`, as it is not sensitive information in this project, and other students require access to the database in order to run it locally.

Please see [`backend/package.json`](/backend/package.json) for more information of the available scripts regarding the database.

## Testing the application

This part assumes that all dependencies are installed. The end-to-end tests assume that the frontend is running, as it attempts to connect to it before running the end-to-end tests.

### Testing `frontend`

```sh
# Navigate to the frontend directory
cd frontend

# Run unit tests and component tests
npm test

# Run E2E tests in browser
npm run test:e2e

# or

# Run E2E tests headless
npm run test:e2e:ci
```
