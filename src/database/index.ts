import { createConnection, Connection, getConnectionOptions  } from 'typeorm';

export default async (host = "database_dtmoney"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: 
        process.env.NODE_ENV === 'test'
          ? 'db_dtmoney_tests'
          : defaultOptions.database,
    }),
  );
}