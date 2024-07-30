import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Status:
 *       type: object
 *       properties:
 *         Status:
 *           type: string
 *           description: Nombre del status
 *           example: "pending"
 */
const statusSchema = new Schema({
  status: String,
});

const Status = model('Status', statusSchema);

export default Status;