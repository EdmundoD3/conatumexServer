// password
import { Router } from "express";
import { PasswordEncrypter } from "../helpers/encrypt.js";
import UserRepository from "../../../repositories/UserRepository.js";
import ValidateUser from "../helpers/validateUser.js";
import HttpStatus from "../../../constants/httpStatus.js";
import validateToken from "../../middleware/validateToken.js";
import validateRoles from "../../middleware/validateRoles.js";
import validateData from "../../middleware/validateData.js";
import registerUserSchema from "../schemas/registerUserSchema.js";
import { rolesToRegister } from "../../../../config/allowedRoles.js";

const registerRouter = Router();

registerRouter.use(validateToken);

/**
 * @swagger
 * /user/inscribe:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Endpoint para registrar un nuevo usuario en el sistema.
 *     tags:
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 4
 *                 example: "John Doe"
 *                 errorMessage: "name isn't string"
 *               username:
 *                 type: string
 *                 minLength: 6
 *                 example: "john_doe123"
 *                 errorMessage: "username isn't string"
 *               phone:
 *                 type: string
 *                 example: "123-456-7890"
 *                 errorMessage: "phone isn't string"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *                 errorMessage: "email isn't string"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "securePassword1"
 *                 errorMessage: "password isn't string"
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["user", "admin"]
 *                 errorMessage: "roles isn't string"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 errorMessage: "is active isn't string"
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: "user registered"
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
 *       409:
 *         description: Conflicto de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ConflictError"
 *                 message:
 *                   type: string
 *                   example: "Email already exists"
 *       500:
 *         description: Internal server error
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

// registerRouter.js
registerRouter.post(
  "/inscribe",
  validateData(registerUserSchema),
  validateRoles(rolesToRegister),
  async (req, res, next) => {
    const validateUser = new ValidateUser(req.body);
    try {
      await validateUser.emailExist();
      await validateUser.usernameExist();
      await validateUser.rolExist();

      const password = await PasswordEncrypter.encrypt(req.body.password);
      await UserRepository.save({ ...req.body, password });

      return res.success({
        data: {
          message: "user registred",
        },
        statusCode: HttpStatus.CREATED.code,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);



export default registerRouter;
