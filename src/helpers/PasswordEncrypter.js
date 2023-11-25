import bcrypt,  { genSalt, hash } from 'bcrypt';

// Public class fields
class PasswordEncrypter {
  static async encrypt(password) {
    const salt = await genSalt(10);
    const passwordEncrypted = await hash(password, salt);
    return passwordEncrypted
  }
  static validPassword(password, passwordEncrypted) {
    const validedPassword = bcrypt.compare(password, passwordEncrypted);
    return validedPassword
  }
}

export { PasswordEncrypter }