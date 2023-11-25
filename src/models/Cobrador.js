import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Cobranza:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The user associated with the collection.
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
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  cash: Number,
  cashDelivered: Number,
  updatedAt: {
    type: Date,
    default: new Date()
  },
});

const Cobranza = model('Cobranza', CobranzaSchema);

export default Cobranza;
