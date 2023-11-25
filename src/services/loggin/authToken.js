import { Router } from "express";
import { jwtVerify, SignJWT } from "jose";
import validateLoginDTO from "./middleware/validateLogin.js";
import authByUserNamePassword from "./helpers/authByUserNamePassword.js";
import User from "../../models/User.js";
import { removeEmployeePassword } from "../../helpers/removePassword.js";

const authTokenRouter = Router();

/**
 * @openapi
 * 
 * /api/auth/login:
 * 
 *   post:
 *     summary: User login
 *     description: Authenticate a user and issue JWT and refresh token upon successful login.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example: "nombre_de_usuario"
 *              password:
 *                type: string
 *                example: "contraseña_secreta"
 *     responses:
 *       '200':
 *         description: User authenticated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwt:
 *                   type: string
 *                   description: JSON Web Token (JWT) for authentication.
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token for renewing JWT.
 *       '401':
 *         description: Unauthorized - Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: true
 *                 msj:
 *                   type: string
 *                   description: Error message.
 * 
 */
authTokenRouter.post("/login", validateLoginDTO, async (req, res) => {
  const { username, password } = req.body;

  try {

    const user = await authByUserNamePassword({username, password});

    const jwtConstructor = new SignJWT({ _id: user._id, username: user.username });

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

    return res.status(200).send({ jwt, refreshToken });
  } catch (error) {
    return res.status(401).send({ error: true, 
      msj: error.message || 'Internal Server Error' });
  }
});

//Token authenticated request to get Employe profile
/**
 * @openapi
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile information
 *     description: Retrieve user profile information using a valid JWT token.
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                 data:
 *                   type: object
 *                   description: User profile data.
 *       '400':
 *         description: Error retrieving user profile information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: true
 *                 msj:
 *                   type: string
 *                   description: Error message.
 *       '401':
 *         description: Unauthorized - Missing or invalid JWT token.
 */
authTokenRouter.get("/profile", async (req, res) => {

  const { authorization } = req.headers;

  if (!authorization) return res.status(400).send({error:true, msj:"auth is missing"});

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    const employee = await User.findById(payload._id);

    if (!employee) return res.status(400).send({error:true, msj:"the employee does not exist"});;

    const resEmploye = removeEmployeePassword(employee)

    return res.status(200).send({error:null, data:resEmploye});
  } catch (error) {
    return res.status(400).send({error:true, msj:error.message});
  }
});

export default authTokenRouter;