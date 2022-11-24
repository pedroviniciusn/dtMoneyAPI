import { DataSource } from "typeorm";

const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "open",
    database: "db_dtmoney",
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
})

export { myDataSource };
