import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public; ");
}

describe("test the migartions route", () => {
  it("Should return 200 when send a request POST to /api/v1/migrations", async () => {
    const firstResponse = await fetch(
      "http://localhost:3000/api/v1/migrations",
      {
        method: "POST",
      },
    );
    expect(firstResponse.status).toBe(201);

    const firstResponseBody = await firstResponse.json();
    expect(Array.isArray(firstResponseBody)).toBe(true);
    expect(firstResponseBody.length).toBeGreaterThan(0);

    const secondResponse = await fetch(
      "http://localhost:3000/api/v1/migrations",
      {
        method: "POST",
      },
    );
    expect(secondResponse.status).toBe(200);

    const secondResponseBody = await secondResponse.json();
    expect(Array.isArray(secondResponseBody)).toBe(true);
    expect(secondResponseBody.length).toBe(0);
  });
});
