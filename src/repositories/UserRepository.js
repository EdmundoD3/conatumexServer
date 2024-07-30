import { ConflictError } from "../errors/typeErrors4xx.js";
import User from "../database/models/UserModel.js";
import { removeEmptyValues } from "./helpers/removeEmptyValues.js";

const errorMessage = "User not created";

class UserRepository {
  constructor() {}

  static getOne(data = {}) {
    try {
      return User.findOne(data);
    } catch (error) {
      throw new ConflictError(error);
    }
  }
  static findById(_id) {
    return this.getOne({ _id });
  }

  static async save({ name, username, phone, email, roles, isActive, password }) {
    const newUser = new User({
      name,
      username,
      phone,
      email,
      roles,
      isActive,
      password,
    });

    try {
      const savedUser = await newUser.save();
      if (!savedUser) {
        throw new ConflictError(errorMessage);
      }
      return savedUser;
    } catch (error) {
      throw new ConflictError(error);
    }
  }
  static async editUser(id, userData = {}) {
    const { name, username, phone, email, roles, isActive } =userData;
    const cleanData = removeEmptyValues({ name, username, phone, email, roles, isActive });
    cleanData.lastUpdate = new Date()
    try {
        await User.findByIdAndUpdate(id,cleanData)
    } catch (error) {
        throw new ConflictError("User not updated")
    }
    
  }
  static async updateIsActive(id,isActive) {
    await User.updateOne({_id:id},isActive)
  }
  static async changePassword(username,newpassword){
    await User.updateOne({username},{password:newpassword})
  }
}



export default UserRepository;
