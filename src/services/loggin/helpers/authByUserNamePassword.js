import { PasswordEncrypter } from "../../../helpers/PasswordEncrypter.js";
import User from "../../../models/User.js";

const authByUserNamePassword = async ({username, password}) => {
  
  const user = await User.findOne({username});
  if (!user) throw new Error("employee not found");

  const validPassword = PasswordEncrypter.validPassword(password,user.password)

  return user;
};

export default authByUserNamePassword;