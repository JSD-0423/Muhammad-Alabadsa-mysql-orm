import { config } from "dotenv";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: join(__dirname, "../../.env") });

export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  JWT_SECRET_KEY,
} = process.env;

export default {
  host: "localhost",
  port: process.env.PORT || 3000,
  JWT_SECRET_KEY,
};

