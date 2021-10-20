import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DATABASE, TEST_DATABASE, USERNAME, PASSWORD, HOST, DEV_PORT, TEST_PORT, ENV } = process.env;

let client;
if (ENV === 'test') {
  client = new Pool({
    database: TEST_DATABASE,
    user: 'postgres',
    password: PASSWORD,
    port: Number(TEST_PORT),
    host: HOST,
  });
}

if (ENV === 'dev') {
  client = new Pool({
    database: DATABASE,
    user: 'postgres',
    password: PASSWORD,
    port: Number(DEV_PORT),
    host: HOST,
  });
}

export default client;
