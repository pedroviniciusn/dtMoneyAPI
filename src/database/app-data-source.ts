import { DataSource } from "typeorm";

const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "open",
    database: "db_dtmoney",
    migrations: ["./src/database/migrations/*.ts"],
    entities: ["./src/modules/**/entities/*.ts"],
    logging: true,
    synchronize: true,
})

export { myDataSource };
