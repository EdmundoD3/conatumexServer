import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
  name: String,
  userName:String,
  phone:String,
  email:String,
  password:String,
  roles:[{rol:String}],
  isActive:Boolean,
});

const Employee = model('Employee', employeeSchema);

export default Employee;