import { Schema, model } from 'mongoose';

const PurchaseSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  vendedor: { type: Schema.Types.ObjectId, ref: 'User' },
  cobrador: { type: Schema.Types.ObjectId, ref: 'User' },
  saleDate: Date,
  creditPrice: Number,
  cashPrice: Number,
  cashPriceEndDate: Date,
  collectionDate: Date,
  collectionFrequency:String,
  sentToCobrador: {
    type: Boolean,
    default: false,
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  payments: [{
    paymentDate: Date,
    amount: Number,
    receiptId: String,
  }],
  updatedAt: {
    type: Date,
    default: new Date()
  },
});

const Purchase = model('Purchase', PurchaseSchema);

export default Purchase;
