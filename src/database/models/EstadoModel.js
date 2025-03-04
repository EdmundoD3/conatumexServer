import { Schema, model } from 'mongoose';

const estadoSchema = new Schema({
  estado: String,
});

const Estado = model('Estado', estadoSchema);

export default Estado;