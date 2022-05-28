import express, { json } from 'express';
import path from 'node:path';
import fs = require('fs');
import swaggerUi = require('swagger-ui-express');

import { customerRouter } from './routers/customerRouter';
import { errorHandler } from './middlewares/errorHandler';

const swaggerFile: any = path.join(__dirname, 'swagger.json');
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

const app = express();

app.use(json());
app.use(customerRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('*', (req, res) => {
  res.sendStatus(404);
});
app.use(errorHandler);

export { app };
