import supertest from "supertest";
import app from "../src/index";

const server = supertest(app);


describe("POST /fruits", () => {
    it("Should respond with status 201 when correct body is sent", async () => {
      const body = {
        name: "Banana",
        price: 5,
      };
  
      const result = await server.post("/fruits").send(body);
  
      expect(result.status).toBe(201);
    });
  
    it("Should respond with status 422 body is not sent", async () => {
      const result = await server.post("/fruits");
  
      expect(result.status).toBe(422);
    });
  
    it("Should respond with status 422 when wrong body is sent", async () => {
      const body = {
        name: { name: "fruit" },
        price: 5,
      };
  
      const result = await server.post("/fruits").send(body);
  
      expect(result.status).toBe(422);
    });
  
    it("Should respond with status 409 when duplicated fruit name is sent", async () => {
      const body = {
        name: "Banana",
        price: 5,
      };
  
      const result = await server.post("/fruits").send(body);
  
      expect(result.status).toBe(409);
    });
  });