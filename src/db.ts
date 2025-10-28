import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
// Configurar DB
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});
// Verifica la conexión
pool.connect()
  .then(() => console.log("📡 Conectando a POSTGRESQL"))
  .catch(err => console.error("Error de conexión a POSTGRESQL:", err));