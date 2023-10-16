import { Router } from "express";
import { jwtVerify, SignJWT } from "jose";
import validateLoginDTO from "../validate/validateLogin.js";
import authByUserNamePassword from "../helpers/authByUserNamePassword.js";
import Employee from "../models/Employee.js";

const authTokenRouter = Router();

//Login con email y password
authTokenRouter.post("/login", validateLoginDTO, async (req, res) => {
  const { username, password } = req.body;

  try {

    const employe = authByUserNamePassword(username, password);

    //GENERAR TOKEN Y DEVOLVER TOKEN
    const jwtConstructor = new SignJWT({ _id: employe._id, username: employe.username, roles: employe.roles });

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("30m")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    const refreshToken = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt, refreshToken });
  } catch (error) {
    return res.sendStatus(401).send({ error: true, msj: error });
  }
});

//Solicitud autenticada con token para obtener el perfil del usuario
authTokenRouter.get("/profile", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    const employee = await Employee.findById(payload._id);

    if (!employee) return res.sendStatus(401);

    delete employee.password;

    return res.send({data:employee});
  } catch (err) {
    return res.sendStatus(401);
  }
});



export default authTokenRouter;