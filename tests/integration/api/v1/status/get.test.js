// checar a porta que o backend abriu

describe("test the status route", () => {
  it("Should return 200 when send a request GET to /api/v1/status", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    console.log("responseBody:", responseBody);

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(parsedUpdatedAt).toEqual(responseBody.updated_at);
    expect(responseBody.dependencies.database.version).toEqual("16.1");
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
  });
});
