import { DataSource } from "typeorm";
import 'dotenv/config'

const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ["./src/database/migrations/*.ts"],
    entities: ["./src/modules/**/entities/*.ts"],
    logging: true,
    synchronize: true,
    migrationsRun: false,
})

export { myDataSource };
