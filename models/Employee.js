import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
  name: String,
  username:String,
  phone:String,
  email:String,
  password:String,
  roles:[{rol:String}],
  isActive:{
    type: Boolean,
    default: false,
  },
});

const Employee = model('Employee', employeeSchema);

export default Employee;