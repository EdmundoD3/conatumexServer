const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  userName:String,
  phone:String,
  email:String,
  password:String,
  roles:[{rol:String}],
  isActive:Boolean,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;