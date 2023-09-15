const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  cobrador: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  saleDate: Date,
  creditPrice: Number,
  cashPrice: Number,
  collectionStartDate: Date,
  cashPriceEndDate: Date,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  payments: [{
    paymentDate: Date,
    amount: Number,
    receipt: String,
  }],
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;
