import request from "supertest";
import app from "../src/app.js";

let employeAuth
const employeeTest = { name:"vanessa", 
    username:"vane200",
    password:"unpassword",
    phone:"812345678", 
    email:"vanessaprueba@gmail.com", roles:["prueba"], isActive:true 
  }

describe("/api/sign_up", () => {

  test("should respond with a 400 status code, without password", async () => {
    const employee = {...employeeTest}
    delete employee.password
    const response = await request(app).post("/api/sign_up").send(employee);
    expect(response.statusCode).toBe(400);
    const expectedResponse = `{"error":true,"msj":"data must have required property 'password'"}`
    expect(response.res.text).toBe(expectedResponse)
    // expect(response).toBe(400);
  });

  test("should respond with a 400 status code, without username", async () => {
    const employee = {...employeeTest}
    delete employee.username
    const response = await request(app).post("/api/sign_up").send(employeeTest);
    expect(response.statusCode).toBe(400);
    const expectedResponse = `{"error":true,"msj":"data must have required property 'username'"}`
    expect(response.res.text).toBe(expectedResponse)
  });

  test("should respond with a 200 status code, creating new user", async () => {
    const response = await request(app).post("/api/sign_up").send(employeeTest);
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a 401 status code, creating the same user", async () => {
    const response = await request(app).post("/api/sign_up").send(employeeTest);
    expect(response.statusCode).toBe(401);
  });
});


describe("/api/auth/login", () => {
  test("should respond with a 200 status code, Log in ", async () => {
    const employee = { 
    username: employeeTest.username,
    password: employeeTest.password
  }
    const response = await request(app).post("/api/auth/login").send(employee);
    expect(response.statusCode).toBe(200);
    employeAuth = JSON.parse(response.res.text)
  });

});

describe("/api/sign_up delete test employe", () => {
  test("should respond with a 200 status code, deleting test user", async () => {
    const response = await request(app).delete("/api/sign_up/test").send();
    expect(response.statusCode).toBe(200);
  });

});

