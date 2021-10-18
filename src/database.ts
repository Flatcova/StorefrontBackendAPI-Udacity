import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { DATABASE, TEST_DATABASE, USERNAME, PASSWORD, HOST, PORT, ENV } =
  process.env;

let client
console.log(ENV);

if(ENV === 'test'){
    client = new Pool({
        database: TEST_DATABASE,
        user: 'postgres',
        password: PASSWORD,
        port: Number(PORT),
        host: HOST
    })
}

if(ENV === 'dev'){
    client = new Pool({
        database: DATABASE,
        user: 'postgres',
        password: PASSWORD,
        port: Number(PORT),
        host: HOST
    })
}

export default client;