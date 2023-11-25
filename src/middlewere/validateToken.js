import { jwtVerify } from "jose";
import User from "../models/User.js";

// middleware to validate token (rutas protegidas)
const verifyToken = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: true, msj: 'Access denied' })
    try {
        const { payload } = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        const employe = await User.findById(payload._id)
        if (!employe) return res.status(403).json({ error: true, msj: 'Access denied' })
        if (!employe.isActive) return res.status(403).json({ error: true, msj: 'is not active' })
        const reqUser = {
            _id: employe._id,
            username:employe.username,
            roles:employe.roles
        }
        req.user = reqUser
        next()
    } catch (error) {
        res.status(400).json({ error: 'token no es válido' })
    }
}

export default verifyToken;