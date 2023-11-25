import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
  name: String,
  password: String,
  email:String,
  phone: String,
  date: Date,
  direction: {
    calle: String,
    numeroCasa: String,
    colonia: { type: Schema.Types.ObjectId, ref: 'Colonia' },
    ciudad: { type: Schema.Types.ObjectId, ref: 'Ciudad' },
    entreCalles: String,
    referencia:String,
  },
  purchase: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
  updatedAt: {
    type: Date,
    default: new Date()
  },
});

const Customer = model('Customer', customerSchema);

export default Customer;