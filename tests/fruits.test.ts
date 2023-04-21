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
        name: 5,
        price: "banana",
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

describe("GET /fruits", () => {
  it("Should respond with status 200 on the response", async () => {

    const result = await server.get("/fruits");

    expect(result.status).toBe(200);
    
  });

  it("Should respond with 2 fruits on the body response", async () => {    

    const body = {
      name: "Maçã",
      price: 3,
    };

    await server.post("/fruits").send(body);    

    const result = await server.get("/fruits")

    expect(result.body).toHaveLength(2);
  });  
});

describe("GET /fruits/:id", () => {
  it("Should respond with status 404 when searching for a fruit id that does not exist", async () => {

    const result = await server.get("/fruits/3");

    expect(result.status).toBe(404);
    
  });

  it("Should respond with 200 and find the following fruits Banana and Maçã on the body response", async () => {    

    const result = await server.get("/fruits/1");
        
    expect(result.status).toBe(200);

    expect(result.body).toMatchObject({
      "id": 1,
      "name": "Banana",
      "price": 5
    });
  }); 
});