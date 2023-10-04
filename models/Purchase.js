import { Schema, model } from 'mongoose';

const PurchaseSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  vendedor: { type: Schema.Types.ObjectId, ref: 'Employee' },
  cobrador: { type: Schema.Types.ObjectId, ref: 'Employee' },
  saleDate: Date,
  creditPrice: Number,
  cashPrice: Number,
  cashPriceEndDate: Date,
  collectionDate: Date,
  collectionFrequency:String,
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  payments: [{
    paymentDate: Date,
    amount: Number,
    receiptId: String,
  }],
});

const Purchase = model('Purchase', PurchaseSchema);

export default Purchase;
