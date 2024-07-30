import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       properties:
 *         rol:
 *           type: string
 *           description: Nombre del rol
 *           example: "admin"
 */
const rolSchema = new Schema({
  rol: String,
});

const Rol = model('Rol', rolSchema);

export default Rol;