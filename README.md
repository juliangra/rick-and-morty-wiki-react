# Team 11: Project 3

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
