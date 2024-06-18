// checar a porta que o backend abriu

describe("test the status route", () => {
  it("Should return 200 when send a request GET to /api/v1/status", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);
  });
});
