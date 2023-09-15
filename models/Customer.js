const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  password: String,
  email:String,
  phone: String,
  date: Date,
  direccion: {
    calle: String,
    numeroCasa: String,
    colonia: { type: mongoose.Schema.Types.ObjectId, ref: 'Colonia' },
    ciudad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciudad' },
    entreCalles: String,
    referencia:String,
  },
  purchase: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }],
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;