import { Type } from "@sinclair/typebox";
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - key
 *       properties:
 *         username:
 *           type: string
 *           minLength: 6
 *           description: Nombre de usuario
 *           example: "john_doe123"
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Contraseña del usuario
 *           example: "securePassword1"
 *         key:
 *           type: string
 *           minLength: 6
 *           maxLength: 40
 *           description: Clave de seguridad adicional
 *           example: "123456"
 *       additionalProperties: false
 *       errorMessage:
 *         additionalProperties: "The body object format is invalid"
 */
const loginSchema = Type.Object({
    username: Type.String({
      minLength: 6,
      errorMessage: {
        type: "username  is not in the correct format",
      },
    }),
    password: Type.String({
      minLength: 6,
      errorMessage: {
        type: "password  is not in the correct format",
      },
    }),
    key: Type.String({
        minLength:6,
        maxLength:40,
        errorMessage:{
            type:"key is not in the correct format"
        }
    })
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "The body object format is invalid",
    },
  }
);

export default loginSchema