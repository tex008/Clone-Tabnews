describe("GET /api/v1/migrations", () => {
  describe("Annonymous user", () => {
    describe("Retrieving current system status", () => {
      it("Should return 200 when send a request GET to /api/v1/status", async () => {
        const response = await fetch("http://localhost:3000/api/v1/status");
        expect(response.status).toBe(200);

        const responseBody = await response.json();

        const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
        expect(parsedUpdatedAt).toEqual(responseBody.updated_at);
        expect(["16.1", "16.4"]).toContain(
          responseBody.dependencies.database.version,
        );
        expect(responseBody.dependencies.database.opened_connections).toEqual(
          1,
        );
      });
    });
  });
});
