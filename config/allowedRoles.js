import RolRepository from "../src/repositories/RolRepository.js";

const { _id: rolCanelaId } = await RolRepository.get("canela");
const { _id: rolAdminId } = await RolRepository.get("admin");
const { _id: rolCobradorId } = await RolRepository.get("cobrador");

const rolesToAdminCustomer = [rolCanelaId, rolAdminId];

const rolesToRegister = [rolCanelaId, rolAdminId];

const rolesToEditYourOwnAccount = [rolCanelaId, rolAdminId];

const rolesToActivateOrDesactivate = [rolCanelaId, rolAdminId];

const rolesToCobranza = [rolCobradorId, rolAdminId];

export {
  rolesToAdminCustomer,
  rolesToRegister,
  rolesToEditYourOwnAccount,
  rolesToActivateOrDesactivate,
  rolesToCobranza,
};
