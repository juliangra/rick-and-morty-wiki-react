# Team 11: Project 3

## Description

This project is full-stack web application about countries.

As a user, you can search and filter countries. As a logged in user, you can rate a give country and check off a given country as visited.

## Live demo

Please use [this link](http://it2810-11.idi.ntnu.no/project3) to visit a live demo of the website.

## Developer Information

Developed by Sebastian Sole, Julian Grande and Magnus Rødseth.

## Documentation

Please read the [`docs` documentation](/docs/README.md).

## Tech stack and libraries

### `frontend`

- React
- TypeScript
- Mantine, a library with UI components and useful hooks
- Zod Schema Validation
- Apollo GraphQL client
- Apollo global state management
- Jest
- React Testing Library
- Cypress, for end-to-end testing

### `backend`

- Express, a web server
- TypeScript
- GraphQL
- Prisma Client, a client for interacting with the PostgreSQL database

### Database

- PostgreSQL, a relational database running on the virtual machine hosted by NTNU
- Docker, for setting up the PostgreSQL container

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

# Start application in development mode
npm run dev

# or

# Compile and start application in production mode
npm start
```

### `db`

Ensure Docker is installed and running on your computer.

```sh
# Spin up a PostgreSQL database
docker compose up
```

Please see [`backend/package.json`](/backend/package.json) for more information of the available scripts regarding the database.

## Testing the application

This part assumes that all dependencies are installed.

### Testing `frontend`

```sh
# Navigate to the frontend directory
cd frontend

# Run unit tests
npm test

# Run E2E tests in browser
npm run test:e2e

# or

# Run E2E tests headless
npm run test:e2e:ci
```

### Testing `backend`

```sh
# Navigate to the backend directory
cd backend

# Run unit tests
npm test
```
