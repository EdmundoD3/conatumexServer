import { Schema, model } from 'mongoose';

const coloniaSchema = new Schema({
  colonia: String,
});

const Colonia = model('Colonia', coloniaSchema);

export default Colonia;
