import 'reflect-metadata';
import * as express from 'express';
import { myDataSource } from './database/app-data-source';

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

app.get('/user', async (req, res) => {
})

app.listen(8080, () => console.log('Server is runing'));