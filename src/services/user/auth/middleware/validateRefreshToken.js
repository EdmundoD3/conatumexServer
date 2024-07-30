import { ForbiddenError, UnauthorizedError } from "../../../../errors/typeErrors4xx.js";
import UserRepository from "../../../../repositories/UserRepository.js";
import AdminAuthToken from "../../../helpers/adminAuthToken.js";

// middleware to validate token (rutas protegidas)
const validateRefreshToken = async (req, res, next) => {
    const token = req.header('refreshtoken')
    try {
        if (!token) throw new UnauthorizedError("refreshtoken not exist")
        const payload = await AdminAuthToken.verify(token)
        const user = await UserRepository.findById(payload._id)
        if (!user) throw new ForbiddenError('Access denied')
        if (!user.isActive) throw new UnauthorizedError('User not active Access denied')
        req.user = {
            id: user._id,
            username:user.username,
            key:payload.key,
            roles:user.roles
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default validateRefreshToken;