import bcrypt,  { genSalt, hash } from 'bcrypt';
import { ValidationError } from '../../../errors/typeErrors4xx.js';

// Public class fields
class PasswordEncrypter {
  static async encrypt(password) {
    const salt = await genSalt(10);
    const passwordEncrypted = await hash(password, salt);
    if(!passwordEncrypted) throw new ValidationError("password not generated")
    return passwordEncrypted
  }
  static validPassword(password, passwordEncrypted) {
    const validedPassword = bcrypt.compare(password, passwordEncrypted);
    return validedPassword
  }
}

export { PasswordEncrypter }