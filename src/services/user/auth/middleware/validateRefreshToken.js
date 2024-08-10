import {
  ForbiddenError,
  UnauthorizedError,
} from "../../../../errors/typeErrors4xx.js";
import UserRepository from "../../../../repositories/UserRepository.js";
import AdminAuthToken from "../../../helpers/adminAuthToken.js";

const validateRefreshToken = async (req, res, next) => {
  const refreshToken = req.header("refreshtoken");

  try {
    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token does not exist");
    }

    const payload = await AdminAuthToken.verifyRefreshJWT(refreshToken);
    const user = await UserRepository.findById(payload._id);

    if (!user) {
      throw new ForbiddenError("Access denied");
    }

    if (!user.isActive) {
      throw new UnauthorizedError("User is not active. Access denied");
    }

    req.user = {
      id: user._id,
      username: user.username,
      key: payload.key,
      roles: user.roles,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default validateRefreshToken;
