import { Schema, model } from 'mongoose';


/**
 * components:
 * schemas:
 *   Employee:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       username:
 *         type: string
 *       phone:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       roles:
 *         type: array
 *         items:
 *           type: string
 *       isActive:
 *         type: boolean
 *         default: false
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