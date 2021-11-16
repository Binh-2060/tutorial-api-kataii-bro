import { Pool, createPool, QueryOptions } from "mysql";
import * as util from "util";
// import * as fs from 'fs';
import { resolve } from "path";
import { config } from "dotenv";
import environment from "./environment";
{}
config({ path: resolve(__dirname, "..", ".env") });

const connection = createPool({
  host: environment.db_host,
  user: environment.db_user,
  password: environment.db_password,
  database: environment.db_schema,
  port: parseInt(`${environment.db_port}`),
  // ssl: {
  //     ca: fs.readFileSync(__dirname + '/../server-ca.pem'),
  //     key: fs.readFileSync(__dirname + '/../client-key.pem'),
  //     cert: fs.readFileSync(__dirname + '/../client-cert.pem'),
  // }
});

export const query = (sql: string | QueryOptions, args?: any) => {
  console.log(`SQL: ${sql}`);
  if (args) {
    console.log(`SQL data:`);
    console.dir(args);
  }
  console.log(`\n`);
  return util.promisify(connection.query).call(connection, sql, args);
};

export const close = () => {
  util.promisify(connection.end).call(connection);
};

export const connectDatabase = () => {
  connection.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("Database has too many connections.");
      }
      if (err.code === "ECONNREFUSED") {
        console.error("Database connection was refused.");
      }
    }
    if (connection && connection.state == "connected") {
      console.info("Database connection was successful.");
      connection.release();
    }
    return;
  });
};