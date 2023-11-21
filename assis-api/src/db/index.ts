import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

export const db = drizzle(
  postgres({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: "require",
    connection: {
      options: `project=${process.env.ENDPOINT_ID}`,
    },
  })
);
