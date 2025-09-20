// tests/auth.test.js
import request from "supertest";
import app from "../server.js"; // adjust path if needed

describe("Auth API", () => {
  it("registers a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "kk",
      email: "kk@example.com",
      password: "kk"
    });

    expect(res.statusCode).toBe(201); // 201 for "created"
    expect(res.body).toHaveProperty("token");
  });
});
