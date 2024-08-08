import RolRepository from "../src/repositories/RolRepository.js";

const { _id: rolCanelaId } = await RolRepository.get("canela");
const { _id: rolAdminId } = await RolRepository.get("admin");

const rolesToCustomer = [rolCanelaId, rolAdminId]

const rolesToRegister = [rolCanelaId, rolAdminId]

const rolesToEditYourOwnAccount = [rolCanelaId, rolAdminId]

const rolesToActivateOrDesactivate = [rolCanelaId, rolAdminId]



export {rolesToCustomer ,rolesToRegister, rolesToEditYourOwnAccount, rolesToActivateOrDesactivate }