import { UnauthorizedError } from "../../../errors/typeErrors4xx.js";
import UserRepository from "../../../repositories/UserRepository.js";
import { PasswordEncrypter } from "./encrypt.js";

const authByUserNamePassword = async ({ username, password }) => {
  try {
    const user = await UserRepository.getOne({ username });
    if (!user) 
      throw new UnauthorizedError('Invalid username or password');

    const isValidPassword = await PasswordEncrypter.validPassword(password, user.password);
    if (!isValidPassword) 
      throw new UnauthorizedError('Invalid username or password');

    return user;
  } catch (error) {
    if (error instanceof UnauthorizedError) 
      throw error;
    
    throw new UnauthorizedError('Authentication failed');
  }
};

export default authByUserNamePassword;
