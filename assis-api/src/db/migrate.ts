import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

migrate(
  drizzle(
    postgres({
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: 5432,
      ssl: "require",
      max: 1,
      connection: {
        options: `project=${process.env.ENDPOINT_ID}`,
      },
    })
  ),
  {
    migrationsFolder: "./drizzle/migrations",
  }
)
  .then(() => console.log("migration complete"))
  .catch((err) => console.error(err));
