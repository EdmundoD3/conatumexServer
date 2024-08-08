import { Router } from "express";
import HttpStatus from "../../../constants/httpStatus.js";
import validatePassword from "../middleware/validatePassword.js";
import AdminAuthToken from "../../helpers/adminAuthToken.js";
import validateRefreshToken from "./middleware/validateRefreshToken.js";
import { UnauthorizedError } from "../../../errors/typeErrors4xx.js";
import validateData from "../../middleware/validateData.js";
import loginSchema from "../schemas/loginSchema.js";

const authTokenRouter = Router();

/**
 * @swagger
 * /user/auth/login:
 *   post:
 *     summary: Autenticación de usuario
 *     description: Endpoint para la autenticación de usuario mediante nombre de usuario y contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Token de autenticación
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       description: Token de actualización
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 statusCode:
 *                   type: integer
 *                   description: Código de estado HTTP
 *                   example: 200
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ValidationError"
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "UnauthorizedError"
 *                 message:
 *                   type: string
 *                   example: "Invalid username or password"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */

authTokenRouter.post(
  "/login",
  validateData(loginSchema),
  validatePassword,
  async (req, res, next) => {
    const { key } = req.body;
    try {
      const token = await AdminAuthToken.create({ user: req.user });
      const refreshToken = await AdminAuthToken.refreshToken({
        user: req.user,
        key,
      });
      const {name, username} = req.user
      return res.success({
        data: {
          token,
          refreshToken,
          user:name,
          username
        },
        ...HttpStatus.OK,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Middleware para validar el token de refresco.
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: UnauthorizedError
 *         message:
 *           type: string
 *           example: refreshtoken not exist
 *
 *     ForbiddenError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: ForbiddenError
 *         message:
 *           type: string
 *           example: Access denied
 *
 * /auth/refreshtoken:
 *   post:
 *     summary: Refrescar token de autenticación
 *     description: Endpoint para refrescar el token de autenticación utilizando un token de refresco.
 *     tags:
 *       - Autenticación
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: "refreshTokenKey123"
 *                 description: Clave de seguridad para confirmar la autorización.
 *     responses:
 *       '200':
 *         description: Token de autenticación refrescado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzg4MzA4ZTUyYzU2NGU5YmU5Y2U3YiIsInVzZXJuYW1lIjoic2FsbHkiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTY0NzUwMjI3MCwiZXhwIjoxNjQ3NTAzODcwLCJqdGkiOiJlODAzMGM2MC1mZGZkLTQwNzktYTc0OC0zNDZmYzE1OGMwZmUiLCJqd3RuX3JlZnJlc2h0VG9rZW4iOiI5MzU3Y2NlMmQ1YzkxMDMwMTEwNDc2N2E5Nzg1M2Q4YyIsInJlZnJlc2h0VG9rZW4iOiI2Y2U1ZTc2YWE0MDY1OTc1YjY3ZjJmMDYzZGM4YjMwZiJ9.Q2PhSzV4k8ZUEqDM5PHis3bfRB6N_9_Gtb0G6u6JvXw"
 *       '400':
 *         description: Error de validación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ValidationError
 *                 message:
 *                   type: string
 *                   example: Datos de entrada inválidos.
 *       '401':
 *         description: Error de autorización.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       '403':
 *         description: Acceso prohibido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenError'
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Se produjo un error inesperado.
 */
authTokenRouter.post(
  "/refreshtoken",
  validateRefreshToken,
  async (req, res) => {
    const { key } = req.user;
    const keyToken = req.header("key");
    try {
      if (!keyToken) throw new UnauthorizedError("Unauthorized Error");
      if (key != keyToken) throw new UnauthorizedError("Unauthorized Error");
      const token = await AdminAuthToken.create({ user: req.user });
      
      return res.success({
        data: {
          token,
        },
        ...HttpStatus.OK,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default authTokenRouter;
