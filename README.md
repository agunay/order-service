This is a simple Node.js API that performs basic CRUD operations on the given Sqlite3 database.

## How to run

1. Install npm modules: `npm install`
2. Start the server: `npm start`
3. Access Swagger on http://localhost:3000/api/docs

## Tests

- Only integration tests are included to test entire functionality
- A local copy of the database is used to achieve this. See `src/__tests__`

## Improvements

1. Swagger file could be auto-generated with the help of Typescript
2. Only Create and Read operations are implemented at the moment (due to time constraints), we can implement Update and Delete endpoints.
3. Need to investigate the open handler in customer router while running tests
4. Migrations for test database & better test setup/teardown
5. Logger implementation
