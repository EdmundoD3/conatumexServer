import { UnauthorizedError } from "../../../../errors/typeErrors4xx.js";

const validateKey = (req, res, next) => {
  try {
    if (!req.user || !req.user.key) {
      throw new UnauthorizedError("User information is missing");
    }

    const { key } = req.user;
    const keyToken = req.header("key");

    if (!keyToken) {
      throw new UnauthorizedError("Key is missing from the request header");
    }

    if (key !== keyToken) {
      throw new UnauthorizedError("Invalid key provided");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateKey;
