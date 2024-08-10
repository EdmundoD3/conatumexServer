import { SignJWT, jwtVerify } from "jose";
import { InternalServerError } from "../../errors/typeErrors5xx.js";
import { JWTExpiredError } from "../../errors/typeErrors4xx.js";

class Token {
  constructor(token, expiryDate) {
    this.token = token;
    this.expiryDate = expiryDate;
  }
}

class AdminAuthToken {
  /**
   * Check if the JWT private key is defined in environment variables
   * @returns {Uint8Array} - The encoded private key
   * @throws {InternalServerError} - If the private key is not defined
   */
  static checkJWTPrivateKey() {
    const privateKey = process.env.JWT_PRIVATE_KEY
    if (!privateKey) {
      throw new InternalServerError(
        "JWT_PRIVATE_KEY is not defined in environment variables"
      );
    }
    const encoder = new TextEncoder();
    return encoder.encode(privateKey);
  }
    /**
   * Check if the JWT private key is defined in environment variables
   * @returns {Uint8Array} - The encoded private key
   * @throws {InternalServerError} - If the private key is not defined
   */
    static checkRefreshJWTPrivateKey() {
      const privateKey = process.env.REFRESH_JWT_PRIVATE_KEY
      if (!privateKey) {
        throw new InternalServerError(
          "REFRESH_JWT_PRIVATE_KEY is not defined in environment variables"
        );
      }
      const encoder = new TextEncoder();
      return encoder.encode(privateKey);
    }

  /**
   * Encode JWT with given data and expiry time
   * @param {Object} param0 - The data and time for the token
   * @param {Object} param0.data - The payload data for the token
   * @param {string} param0.time - The expiration time for the token
   * @returns {Promise<string>} - The signed JWT
   */
  static async encode({ data, time = "30m", privateKey }) {
    try {
      const jwtConstructor = new SignJWT(data);
      const jwt = await jwtConstructor
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(time)
        .sign(privateKey);

      return jwt;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Create JWT for a user
   * @param {Object} param0 - The user data
   * @param {Object} param0.user - The user object
   * @returns {Promise<Token>} - The token and expiry date
   */
  static async create({ user }) {
    const data = {
      _id: user.id,
      username: user.username,
    };
    const thirtyMinutesInMs = 30 * 60 * 1000;
    const expiryDate = new Date(Date.now() + thirtyMinutesInMs);
    const privateKey = this.checkJWTPrivateKey();
    const token = await this.encode({ data, time: "30m",privateKey });
    return new Token(token, expiryDate);
  }

  /**
   * Refresh JWT for a user
   * @param {Object} param0 - The user data and key
   * @param {Object} param0.user - The user object
   * @param {string} param0.key - The key for the refresh token
   * @returns {Promise<Token>} - The new token and expiry date
   */
  static async refreshToken({ user, key }) {
    const data = {
      _id: user._id,
      username: user.username,
      key,
    };
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(Date.now() + sevenDaysInMs);
    const privateKey = this.checkRefreshJWTPrivateKey();
    const token = await this.encode({ data, time: "7d",privateKey });
    return new Token(token, expiryDate);
  }

  /**
   * Verify JWT
   * @param {string} token - The JWT to verify
   * @returns {Promise<Object>} - The payload of the verified JWT
   * @throws {JWTExpiredError} - If the JWT has expired
   */
  static verifyJWT(token){
    const privateKey = this.checkJWTPrivateKey();
    return this.verify(token,privateKey)
  }
  static verifyRefreshJWT(token){
    const privateKey = this.checkRefreshJWTPrivateKey();
    return this.verify(token,privateKey)
  }
  static async verify(token,privateKey) {
    try {
      const { payload } = await jwtVerify(token, privateKey);
      return payload;
    } catch (error) {
      if (error.code === "ERR_JWT_EXPIRED") {
        throw new JWTExpiredError("JWT expiró");
      }
      throw error;
    }
  }
}

export default AdminAuthToken;
