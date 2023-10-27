import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Cobranza:
 *       type: object
 *       properties:
 *         employee:
 *           type: string
 *           description: The employee associated with the collection.
 *         lastCuttingDate:
 *           type: string
 *           format: date
 *           description: The last cutting date for the collection.
 *         cash:
 *           type: number
 *           description: The total cash amount collected.
 *         cashDelivered:
 *           type: number
 *           description: The cash amount delivered.
 */
const CobranzaSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
  lastCuttingDate: Date,
  cash: Number,
  cashDelivered: Number,
});

const Cobranza = model('Cobranza', CobranzaSchema);

export default Cobranza;
