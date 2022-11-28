import 'reflect-metadata';
import './shared/container';
import 'express-async-errors'
import * as express from 'express';
import { myDataSource } from './database/app-data-source';
import { Transactions } from './modules/transactions/entities/Transactions';
import { User } from './modules/accounts/entities/User';
import { clientErrorHandler } from './middlewares/clientErrorHandler';
import { router } from './routes';

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

app.post('/transactions', async (req, res) => {
  const {
    title,
    amount,
    category,
    type,
  } = req.body
  
  const transactions = new Transactions()

  transactions.title = title
  transactions.amount = amount
  transactions.category = category
  transactions.type = type
  
  await myDataSource.manager.save(transactions)

  const user = new User() 

  user.name = 'pedro'
  user.email = 'pedro@gmail'
  user.password = 'kjabfkabfabkjf'
  user.transactions = [transactions]

  await myDataSource.manager.save(user)
})

app.use(clientErrorHandler);

app.listen(8080, () => console.log('Server is runing'));