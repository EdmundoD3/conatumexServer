import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Purchase:
 *       type: object
 *       properties:
 *         customer:
 *           type: string
 *           description: ID del cliente que realizó la compra
 *           example: "60b8d295f1e56c39a5e67d1b"
 *         vendedor:
 *           type: string
 *           description: ID del vendedor que realizó la venta
 *           example: "60b8d295f1e56c39a5e67d1c"
 *         cobrador:
 *           type: string
 *           description: ID del cobrador asignado a la compra
 *           example: "60b8d295f1e56c39a5e67d1d"
 *         saleDate:
 *           type: string
 *           format: date-time
 *           description: Fecha de la venta
 *           example: "2023-05-15T14:30:00Z"
 *         creditPrice:
 *           type: number
 *           description: Precio de la compra a crédito
 *           example: 1500.00
 *         cashPrice:
 *           type: number
 *           description: Precio de la compra en efectivo
 *           example: 1400.00
 *         cashPriceEndDate:
 *           type: string
 *           format: date-time
 *           description: Fecha límite para el precio en efectivo
 *           example: "2023-06-15T14:30:00Z"
 *         collectionDate:
 *           type: string
 *           format: date-time
 *           description: Fecha de recolección del pago
 *           example: "2023-06-01T14:30:00Z"
 *         collectionFrequency:
 *           type: string
 *           description: Frecuencia de recolección del pago
 *           example: "semanal"
 *         sentToCobrador:
 *           type: boolean
 *           description: Indica si la compra ha sido enviada al cobrador
 *           example: false
 *         products:
 *           type: array
 *           items:
 *             type: string
 *             description: ID del producto asociado a la compra
 *             example: "60b8d295f1e56c39a5e67d1e"
 *         payments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               paymentDate:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha del pago
 *                 example: "2023-06-05T14:30:00Z"
 *               amount:
 *                 type: number
 *                 description: Monto del pago
 *                 example: 300.00
 *               receiptId:
 *                 type: string
 *                 description: ID del recibo del pago
 *                 example: "REC123456"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del registro
 *           example: "2023-06-10T14:30:00Z"
 */

const PurchaseSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  vendedorId: { type: Schema.Types.ObjectId, ref: "User" },
  cobradorId: { type: Schema.Types.ObjectId, ref: "User" },
  saleDate: Date,
  creditPrice: Number,
  cashPrice: Number,
  cashPriceEndDate: Date,
  collectionDate: Date,
  notes: [
    {
      date: { type: Date, required: true, unique: true },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      note: String,
    },
  ],
  collectionFrequency: { amount: String, frequency: String },
  sentToCobrador: {
    type: Boolean,
    default: false,
  },
  products: [
    {
      quantity: Number,
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
    },
  ],
  totalPaid: Number,
  payments: [
    {
      date: { type: Date, required: true, unique: true },
      amount: Number,
      receiptId: String,
      userId: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  statusId: { type: Schema.Types.ObjectId, ref: "Status" },
  isActive: {
    type: Boolean,
    default: false,
  },
});

// Registra el modelo con el nombre 'Purchase'
const Purchase = model("Purchase", PurchaseSchema);

export default Purchase;
