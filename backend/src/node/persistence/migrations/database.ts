import {DataSource, DataSourceOptions} from 'typeorm';
import * as db from '../';
import * as process from "process";
import * as process from "process";
import * as process from "process";
import * as process from "process";
import * as process from "process";
import * as process from "process";
import * as process from "process";

const dbConfig: DataSourceOptions = {
    appName: "",
    driver: undefined,
    location: "",
    region: "",
    resourceArn: "",
    secretArn: "",
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'insuratradeflow',
    entities: [db.InsurancePolicyDao],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: true,
    migrations: [],
    subscribers: []
}; // TODO finish this !

export const AppDataSource = new DataSource(dbConfig);