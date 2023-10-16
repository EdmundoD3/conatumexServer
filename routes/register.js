// password
import { genSalt, hash } from 'bcrypt';
// validation
import { Router } from 'express';
import Employee from '../models/Employee.js';
import validateRegister from '../validate/validateRegister.js';

const router = Router();

router.post('/register', validateRegister, async (req, res) => {

    // validate employe    
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const isEmailExist = await Employee.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({ error: 'Email ya registrado' })
    }

    // hash contraseña
    const salt = await genSalt(10);
    const password = await hash(req.body.password, salt);
    const { name, userName, phone, email, roles, isActive } = req.body
    const employe = new Employee({
        name, userName, phone, email, roles, isActive,
        password: password
    });
    try {
        const savedEmploye = await employe.save();
        res.status(200).json({
            error: null,
            data: savedEmploye
        })
    } catch (error) {
        res.status(400).json({ error })
    }
})

export default router;