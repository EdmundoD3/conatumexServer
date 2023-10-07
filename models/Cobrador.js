import { Schema, model } from 'mongoose';

const CobranzaSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
  lastCuttingDate: Date,
  cash: Number,
  cashDelivered: Number,
});

const Cobranza = model('Cobranza', CobranzaSchema);

export default Cobranza;
