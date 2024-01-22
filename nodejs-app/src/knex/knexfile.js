import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import knex from "knex";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const development = knex({
  client: 'mssql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: path.join(__dirname, '/data/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, '/data/seeds'),
  }
});

export default development;