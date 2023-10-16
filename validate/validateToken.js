import { verify } from 'jsonwebtoken'

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error:true ,msj:'Acceso denegado' })
    try {
        const verified = verify(token, process.env.JWT_PRIVATE_KEY)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

export default verifyToken;