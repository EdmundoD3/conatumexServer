import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Ciudad:
 *       type: object
 *       properties:
 *         ciudad:
 *           type: string
 *           description: The name of the city.
 */
const ciudadSchema = new Schema({
  ciudad: String,
});

const Ciudad = model('Ciudad', ciudadSchema);

export default Ciudad;