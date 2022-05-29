This is a simple Node.js API that performs basic CRUD operations on the given Sqlite3 database. A Swagger UI is utilised to allow users interact with the API.

Note that the emphasis on this codebase is on the structure of the project rather than the completeness of all the endpoints we might ever want for this service. It intends to demonstrate life like project structure, data access, documentation, validation etc.

## How to run

1. Install npm modules: `npm install`
2. Start the server: `npm start`
3. Access Swagger on http://localhost:3000/api/docs

Note that endpoints utilise `express-validator` validation on the input fields, but the service should guide you for the accepted formats.

## Tests

- Run `npm run test` to trigger jest runner
- Only integration tests are included to test end-to-end functionality with the help of library `supertest`
- A local copy of the database is used to achieve this. See `src/__tests__` - kind of a hack

## Improvements

1. Swagger file could be auto-generated with the help of Typescript. (Possible library options: [TSOA](https://tsoa-community.github.io/docs/introduction.html), [routing-controllers](https://github.com/typestack/routing-controllers), [typeconv](https://github.com/grantila/typeconv))
2. Only Create and Read operations are implemented at the moment (due to time constraints), we can implement Update and Delete endpoints.
3. Need to investigate the open handler issue in customer router while running tests
4. Migrations for test database & better test setup/teardown; (simpler) alternative to migrations is fs operations during test setup to copy the database from an original
5. Response structure should be unified, e.g. we're at the moment sending 200 when we try to GET an order that doesn't exist, 404 would be more appropriate. I didn't add these checks to response to save time
6. Logger implementation
7. Lint & prettier
8. Test coverage report
9. Name "Order Service" is not really all-encompassing as we are dealing with customers and items as well, maybe separate it out onto different microservices? It wasn't feasible in this case as given db file contains all tables in the same database.
