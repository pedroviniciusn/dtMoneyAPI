import { app } from 'server';

const port = 8080;

app.listen(port, () => console.log(`Server is runing in port ${port} ${process.env.DB_NAME}`));