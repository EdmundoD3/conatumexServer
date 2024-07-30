import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del cliente
 *           example: "John Doe"
 *         password:
 *           type: string
 *           description: Contraseña del cliente
 *           example: "securePassword1"
 *         email:
 *           type: string
 *           description: Correo electrónico del cliente
 *           example: "john@example.com"
 *         phone:
 *           type: string
 *           description: Número de teléfono del cliente
 *           example: "123-456-7890"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del cliente
 *           example: "2023-06-28T00:00:00.000Z"
 *         direction:
 *           type: object
 *           properties:
 *             calle:
 *               type: string
 *               description: Calle del cliente
 *               example: "123 Main St"
 *             numeroCasa:
 *               type: string
 *               description: Número de casa del cliente
 *               example: "456"
 *             colonia:
 *               type: string
 *               description: ID de la colonia del cliente
 *               example: "60d5ec49c5e3f3d5c8d4e7f2"
 *             ciudad:
 *               type: string
 *               description: ID de la ciudad del cliente
 *               example: "60d5ec49c5e3f3d5c8d4e7f3"
 *             entreCalles:
 *               type: string
 *               description: Entre calles del cliente
 *               example: "5th Ave and 6th Ave"
 *             referencia:
 *               type: string
 *               description: Referencia del cliente
 *               example: "Near the park"
 *         purchase:
 *           type: array
 *           items:
 *             type: string
 *             description: ID de la compra
 *             example: "60d5ec49c5e3f3d5c8d4e7f4"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización del cliente
 *           example: "2023-06-28T00:00:00.000Z"
 */
const customerSchema = new Schema({
  name: String,
  password: String,
  email:String,
  phone: String,
  date: Date,
  direction: {
    calle: String,
    numeroCasa: String,
    coloniaId: { type: Schema.Types.ObjectId, ref: 'Colonia' },
    ciudadId: { type: Schema.Types.ObjectId, ref: 'Ciudad' },
    entreCalles: String,
    referencia:String,
  },
  statusId:{ type: Schema.Types.ObjectId, ref: 'Status' },
  purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
  updatedAt: {
    type: Date,
    default: new Date()
  },
});

const Customer = model('Customer', customerSchema);

export default Customer;