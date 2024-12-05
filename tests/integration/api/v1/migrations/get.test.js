import orchestrator from "../../../../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Annonymous user", () => {
    describe("Retrieving pending migrations", () => {
      it("Should return 200 when send a request GET to /api/v1/migrations", async () => {
        const response = await fetch("http://localhost:3000/api/v1/migrations");
        expect(response.status).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });
    });
  });
});
