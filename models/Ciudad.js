import { Schema, model } from 'mongoose';

const ciudadSchema = new Schema({
  ciudad: String,
});

const Ciudad = model('Ciudad', ciudadSchema);

export default Ciudad;