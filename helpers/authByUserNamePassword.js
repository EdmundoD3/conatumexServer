import Employee from "../models/Employee.js";

const authByUserNamePassword = async ({userName, password}) => {
  const employee = await Employee.findOne((employee) => employee.userName === userName);
  if (!employee) throw new Error("employee not found");

  if (employee.password !== password) throw new Error("auth error");

  return employee;
};

export default authByUserNamePassword;