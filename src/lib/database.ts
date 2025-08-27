import mysql from "mysql2/promise";

// Konfigurasi database dari environment variable atau default
const DATABASE_URL = process.env.DATABASE_URL || "mysql://root:@localhost:3306/twibbon_db";

// Parse DATABASE_URL
const url = new URL(DATABASE_URL);
const dbConfig = {
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1), // Remove leading slash
  port: parseInt(url.port) || 3306,
};

// Pool connection
const pool = mysql.createPool(dbConfig);

// Log konfigurasi database (tanpa password)
console.log("Database config:", {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
});

// Test connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully!");
    connection.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

// Query helper
export async function query(sql: string, params?: unknown[]) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
}

// Database sudah ada, tidak perlu init lagi

export default pool;
