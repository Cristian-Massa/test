import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("Database url is required");
}

console.log(DATABASE_URL);
export default defineConfig({
  out: "./src/modules/database",
  schema: "./src/modules/**/**/*.schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
