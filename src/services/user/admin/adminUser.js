import { Router } from "express";
import { PasswordEncrypter } from "../helpers/encrypt.js";
import UserRepository from "../../../repositories/UserRepository.js";
import HttpStatus from "../../../constants/httpStatus.js";
import validateToken from "../../middleware/validateToken.js";
import validateRoles from "../../middleware/validateRoles.js";
import validateData from "../../middleware/validateData.js";
import editUserSchema from "../schemas/editUserSchema.js";
import validatePassword from "../middleware/validatePassword.js";
import changePasswordTypeSchema from "../schemas/changePasswordTypeSchema.js";
import {
  rolesToActivateOrDesactivate,
  rolesToEditYourOwnAccount
} from "../../../../config/allowedRoles.js";

const adminUserRouter = Router();

adminUserRouter.use(validateToken);

adminUserRouter.post(
  "/edit/:id",
  validateData(editUserSchema),
  validateRoles(rolesToEditYourOwnAccount),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      await UserRepository.editUser(id, req.body);
      return res.success({
        data: {
          message: "ok",
        },
        ...HttpStatus.CREATED,
      });
    } catch (error) {
      next(error);
    }
  }
);

adminUserRouter.get(
  "/change-password",
  validateData(changePasswordTypeSchema),
  validatePassword,
  async (req, res) => {
    const { username } = req.body;
    try {
      const newpassword = await PasswordEncrypter.encrypt(req.body.newPassword);
      await UserRepository.changePassword(username, newpassword);
      return res.success({
        data: {
          message: "User desactivated",
        },
        ...HttpStatus.CREATED,
      });
    } catch (error) {
      next(error);
    }
  }
);

adminUserRouter.patch(
  "/activate/:id",
  validateRoles(rolesToActivateOrDesactivate),
  async (req, res) => {
    const { id } = req.params;
    try {
      await UserRepository.updateIsActive(id, true);
      return res.success({
        data: {
          message: "User activated",
        },
        ...HttpStatus.CREATED,
      });
    } catch (error) {
      next(error);
    }
  }
);

adminUserRouter.patch(
  "/deactivate/:id",
  validateRoles(rolesToActivateOrDesactivate),
  async (req, res) => {
    const { id } = req.params;
    try {
      await UserRepository.updateIsActive(id, false);
      return res.success({
        data: {
          message: "User desactivated",
        },
        ...HttpStatus.CREATED,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default adminUserRouter;
