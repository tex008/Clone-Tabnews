import database from "infra/database.js";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const defaultMigratioOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  switch (request.method) {
    case "GET":
      const pendingMigrations = await migrationRunner(defaultMigratioOptions);

      await dbClient.end();

      return response.status(200).json(pendingMigrations);
    case "POST":
      const migratedMigrations = await migrationRunner({
        ...defaultMigratioOptions,
        dryRun: false,
      });

      await dbClient.end();

      return response
        .status(migratedMigrations.length > 0 ? 201 : 200)
        .json(migratedMigrations);

    default:
      return response.status(405).end();
  }
}
