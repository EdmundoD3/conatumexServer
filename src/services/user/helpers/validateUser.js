import RolRepository from "../../../repositories/RolRepository.js";
import UserRepository from "../../../repositories/UserRepository.js";
import { ConflictError, ValidationError } from "../../../errors/typeErrors4xx.js";

const messageError = {
    email: 'Email already registered',
    username: 'Username already registered',
    rol: 'Some rol is not exist',
}


class ValidateUser  {
    constructor(userData={}){
        this.userData = userData
    }
    async emailExist(){
        const {email} = this.userData
        if (!email) return
        // If there is a user with the same email or the same name, a new one cannot be added
        const isEmailExist = await UserRepository.getOne({ email });
        if (isEmailExist)
            throw new ConflictError(messageError.email) //res.status(401).json({ error: true, msj: 'Email or username already registered' })
    }
    async usernameExist(){
        const {username} = this.userData
        // If there is a user with the same email or the same name, a new one cannot be added
        const isUsernameExist = await UserRepository.getOne({ username });
        if (isUsernameExist)
            throw new ConflictError(messageError.username) //res.status(401).json({ error: true, msj: 'Email or username already registered' })
    }
    async rolExist() {
        const {roles} = this.userData
        const someRoleIsUndefined = await RolRepository.someRoleIsUndefined(roles)
        if (someRoleIsUndefined)
            throw new ValidationError(messageError.rol)
    }
}

export default ValidateUser