import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "twibbon_db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: Number(process.env.CONNECTION_LIMIT) || 10,
});
