import { jwtVerify } from "jose";

// middleware to validate token (rutas protegidas)
const verifyToken = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error:true , msj:'Access denied' })
    try {
        const { payload } = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
          );
        req.user = payload
        next() 
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

export default verifyToken;