import request from "supertest";
import {Pool} from "pg";
import {setupRoutes} from "../src/app";


describe("Create User Endpoint", () => {
    let pool: Pool;

    beforeAll(async () => {
        pool = new Pool({
            connectionString: "postgres://user:password@localhost:5432/testdb?sslmode=disable",
        });

        await pool.query("TRUNCATE TABLE users");
    })

    it("should respond with OK", async () => {
        const payload = { name: "John Doe", email: "john.doe@example.com" };

        // Use Supertest to send a request
        const response = await request(setupRoutes(pool))
            .post("/users")
            .send(payload)
            .set("Content-Type", "application/json");

        // Assert response
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({ message: "User created" });
    });

    afterAll(async () => {
       await pool.query("TRUNCATE TABLE users");
    })
});