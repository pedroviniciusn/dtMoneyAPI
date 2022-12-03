import 'reflect-metadata';
import './shared/container';
import 'express-async-errors'

import express from 'express';

import { router } from './routes';

import swaggerUi from "swagger-ui-express";
import swaggerFile from './swagger.json';

import { myDataSource } from './database/app-data-source';

import { clientErrorHandler } from './middlewares/clientErrorHandler';

myDataSource
    .initialize()
    .then(() => {
      console.log('Data source has been initialized!')
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err)
  })

const app = express();

app.use(express.json());

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(clientErrorHandler);

const port = 8080;

app.listen(port, () => console.log(`Server is runing in port ${port}`));