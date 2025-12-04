import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";

// Ensure we load the server-local .env when the process is started from the repository root
const envPath = path.resolve(new URL("./.env", import.meta.url).pathname);
dotenv.config({ path: envPath });

/**
 * Creates and returns a Sequelize MySQL connection instance.
 * Uses these environment variables:
 * - DB_HOST: MySQL host (e.g. sql12.freesqldatabase.com)
 * - DB_USER: MySQL user
 * - DB_PASS: MySQL password
 * - DB_NAME: Database name
 * - DB_PORT: MySQL port (default 3306)
 */
export function getMySQLConnection() {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const database = process.env.DB_NAME;
  const port = process.env.DB_PORT || 3306;

  if (!host || !user || !password || !database) {
    throw new Error(
      "MySQL connection credentials are missing. Please set DB_HOST, DB_USER, DB_PASS, and DB_NAME environment variables."
    );
  }

  return new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

export default getMySQLConnection;
