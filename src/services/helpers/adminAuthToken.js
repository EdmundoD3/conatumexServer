import { SignJWT, jwtVerify } from "jose";
import { InternalServerError } from "../../errors/typeErrors5xx.js";
import {
  JWTExpiredError,
  UnauthorizedError,
} from "../../errors/typeErrors4xx.js";

class Token{
  constructor(token,expiryDate){
    this.token = token
    this.expiryDate = expiryDate
  }
}

class AdminAuthToken {
  static async encode({ data, time = "30m" }) {
    try {
      if (!process.env.JWT_PRIVATE_KEY)
        throw new InternalServerError(
          "JWT_PRIVATE_KEY is not defined in environment variables"
        );

      const jwtConstructor = new SignJWT(data);
      const encoder = new TextEncoder();
      const jwt = await jwtConstructor
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(time)
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

      return jwt;
    } catch (error) {
      if (!(error instanceof InternalServerError))
        throw new InternalServerError(error.message);

      throw error;
    }
  }

  static async create({ user }) {
    const data = {
      _id: user._id,
      username: user.username,
    };
    const currentDate = new Date();
    const thirtyMinutes = 30 * 60 * 1000
    const expiryDate = new Date(currentDate.getTime() + thirtyMinutes);
    const token = await this.encode({ data, time: "30m" })
    const tokenData =  new Token(token,expiryDate)
    return tokenData;
  }

  static async refreshToken({ user, key }) {
    const data = {
      _id: user._id,
      username: user.username,
      key,
    };
    //expiry date
    const currentDate = new Date();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(currentDate.getTime() + sevenDaysInMs);
    //get token
    const token = await this.encode({ data, time: "7d" })

    const tokenData = new Token(token,expiryDate)
    return tokenData;
  }

  static async verify(token) {
    try {
      if (!process.env.JWT_PRIVATE_KEY) {
        throw new Error(
          "JWT_PRIVATE_KEY is not defined in environment variables"
        );
      }

      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(
        token,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
      );
      return payload;
    } catch (error) {
      if (error.message.includes("exp"))
        throw new JWTExpiredError("JWT expiró");
      throw error;
    }
  }
}

export default AdminAuthToken;
