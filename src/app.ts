import 'reflect-metadata';
import * as express from 'express';
import { myDataSource } from './database/app-data-source';
import { Transactions } from './modules/transactions/entities/Transactions';
import { User } from './modules/accounts/entities/User';

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
  const userRepository = myDataSource.getRepository(User)
  const user = await userRepository.find({
    relations: {
        transactions: true,
    },
  })

  return res.json({ user });
})

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

app.listen(8080, () => console.log('Server is runing'));