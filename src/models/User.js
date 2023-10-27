import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  nombre: String,
  correo: String,
  password: String
});

const User = model('User', userSchema);

export default User;
