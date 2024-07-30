import mongoose from "mongoose";
import { ValidationError } from "../errors/typeErrors4xx.js";
import Rol from "../database/models/RolModel.js";

class RolRepository {
  constructor() {}
  static findArray(roles = []) {
    return Rol.find({ rol: { $in: roles } });
  }
  static findByIdArray(rolesId=[]){
    const objectIds = rolesId.map(id => new mongoose.Types.ObjectId(id));
    return Rol.find({ _id: { $in: objectIds } });
  }
  static async verifyRoles(roles = []) {
    const rolesFinded = await this.findArray(roles);

    const theRolesMatch = roles.map(
      (e) => rolesFinded.find(({ rol }) => rol == e)?.rol
    );
    const someRoleIsUndefined = theRolesMatch.some(item => item === null || item === undefined || Number.isNaN(item));
    if (someRoleIsUndefined)
      throw new ValidationError("Rol is not exist")
  }
  static async someRoleIsUndefined(roles = []) {
    const rolesFinded = await this.findByIdArray(roles);
    const theRolesMatch = roles.map(
      (id) => rolesFinded.find(({ _id }) => _id == id)?.rol
    );
    const someRoleIsUndefined = theRolesMatch.some(item => item === null || item === undefined || Number.isNaN(item));
    return someRoleIsUndefined
  }
  static get(rol){
    return Rol.findOne({rol})
  }
}

export default RolRepository;
