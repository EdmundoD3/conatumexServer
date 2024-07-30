import {
  ForbiddenError,
  UnauthorizedError,
} from "../../errors/typeErrors4xx.js";
function hasCommonElement(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item.toString()));
}

const validateRoles =
  (validRolesId = []) =>
  async (req, res, next) => {
    const { roles } = req.user;
    try {
      if (!roles) throw new ForbiddenError("Access denied");
      const hasNotValidRoles = !hasCommonElement(validRolesId,roles);
      if (hasNotValidRoles) throw new UnauthorizedError("unauthorized user");
      next();
    } catch (error) {
      next(error);
    }
  };


export default validateRoles;
