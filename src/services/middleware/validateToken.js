import { ForbiddenError, UnauthorizedError } from "../../errors/typeErrors4xx.js";
import UserRepository from "../../repositories/UserRepository.js";
import AdminAuthToken from "../helpers/adminAuthToken.js";

// middleware to validate token (rutas protegidas)
const validateToken = async (req, res, next) => {
    const token = req.header('token')
    try {
        if (!token) throw new UnauthorizedError("token not exist")
        const payload = await AdminAuthToken.verifyJWT(token)
        const user = await UserRepository.findById(payload._id)
        if (!user) throw new ForbiddenError('Access denied')
        if (!user.isActive) throw new UnauthorizedError('User not active Access denied')
        req.user = {
            id: user._id,
            username:user.username,
            roles:user.roles
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default validateToken;