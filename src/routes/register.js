// password
import { genSalt, hash } from 'bcrypt';
import { Router } from 'express';
import Employee from '../models/Employee.js';
import validateRegister from '../validate/validateRegister.js';
import { removeEmployeePassword } from '../helpers/removePassword.js';

const router = Router();

/**
 * @openapi
 * /api/employees:
 *   post:
 *     summary: Register a new employee
 *     description: Register a new employee with their name, username, contact details, roles, and activation status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the employee.
 *               username:
 *                 type: string
 *                 description: The username for the employee.
 *               phone:
 *                 type: string
 *                 description: The phone number of the employee.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the employee.
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of roles assigned to the employee.
 *               isActive:
 *                 type: boolean
 *                 description: The activation status of the employee.
 *     responses:
 *       '200':
 *         description: Employee registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                 data:
 *                   type: object
 *                   description: Details of the registered employee.
 *       '400':
 *         description: Error registering the employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: true
 *                 msj:
 *                   type: string
 *                   description: Error message.
 *       '401':
 *         description: Email or username already registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: true
 *                 msj:
 *                   type: string
 *                   description: Error message.
 */
router.post('/', validateRegister, async (req, res) => {
    const { name, username, phone, email, roles, isActive } = req.body


    const isEmailExist = await Employee.findOne({ email });
    const isUsernameExist = await Employee.findOne({ username });
    if (isUsernameExist || isEmailExist)
        return res.status(401).json({ error: true, msj: 'Email or username already registered' })


    // hash contraseña
    const salt = await genSalt(10);
    const password = await hash(req.body.password, salt);
    const employe = new Employee({
        name, username, phone, email, roles, isActive,
        password
    });
    try {
        const savedEmploye = await employe.save();
        
        const resEmploye = removeEmployeePassword(savedEmploye)

        res.status(200).json({
            error: null,
            data: resEmploye
        })
    } catch (error) {
        res.status(400).json({ error:true, msj:error })
    }
})

export default router;