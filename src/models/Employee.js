import { Schema, model } from 'mongoose';


/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the employee.
 *         username:
 *           type: string
 *           description: The username for the employee.
 *         phone:
 *           type: string
 *           description: The phone number of the employee.
 *         email:
 *           type: string
 *           description: The email address of the employee.
 *         password:
 *           type: string
 *           description: The password of the employee.
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of roles assigned to the employee.
 *         isActive:
 *           type: boolean
 *           default: false
 *           description: The activation status of the employee.
 */

const employeeSchema = new Schema({
  name: String,
  username:String,
  phone:String,
  email:String,
  password:String,
  roles:[String],
  isActive:{
    type: Boolean,
    default: false,
  },
});

const Employee = model('Employee', employeeSchema);

export default Employee;