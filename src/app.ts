import 'reflect-metadata';
import * as express from 'express';
import { myDataSource } from './database/app-data-source';

import { User } from '../src/entity/user.entity'

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

app.get('/user', (req, res) => {
  console.log(User)
})

app.listen(8080, () => console.log('Server is runing'));