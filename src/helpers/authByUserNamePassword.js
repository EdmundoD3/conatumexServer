import Employee from "../models/Employee.js";
// const bcrypt = require('bcrypt');
import bcrypt from "bcrypt"


const authByUserNamePassword = async ({username, password}) => {

  const employee = await Employee.findOne({username});
  if (!employee) throw new Error("employee not found");

  const validPassword = bcrypt.compare(password, employee.password);
  if (!validPassword) throw new Error("auth error");

  return employee;
};

export default authByUserNamePassword;