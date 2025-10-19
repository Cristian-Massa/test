import { DATABASE_URL } from "@/modules/config/enviroments.config.js";
import { drizzle } from "drizzle-orm/node-postgres";
export const db = drizzle(DATABASE_URL);
