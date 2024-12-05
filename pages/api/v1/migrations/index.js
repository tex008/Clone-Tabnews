import database from "infra/database.js";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";

export default async function migrations(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigratioOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    const allowedMethods = ["GET", "POST"];
    switch (true) {
      case !allowedMethods.includes(request.method): {
        return response
          .status(405)
          .send({ error: `Method ${request.method} not allowed` });
      }
      case request.method === "GET": {
        const pendingMigrations = await migrationRunner(defaultMigratioOptions);

        return response.status(200).json(pendingMigrations);
      }
      case request.method === "POST": {
        const migratedMigrations = await migrationRunner({
          ...defaultMigratioOptions,
          dryRun: false,
        });

        return response
          .status(migratedMigrations.length > 0 ? 201 : 200)
          .json(migratedMigrations);
      }
      default: {
        break;
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await dbClient.end();
  }
}
