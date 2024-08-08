import express from "express";
import validateRoles from "../middleware/validateRoles.js";
import validateToken from "../middleware/validateToken.js";
import CustomerRepository from "../../repositories/CustomerRepository.js";
import HttpStatus from "../../constants/httpStatus.js";
import validateData from "../middleware/validateData.js";
import customerBodySchema from "./schemas/customerSchema.js";
import customerBodySearchSchema from "./schemas/customerBodySearchSchema.js";
import { rolesToCustomer } from "../../../config/allowedRoles.js";


const customerRoutes = express();

const validateRolesMiddleware = validateRoles(rolesToCustomer);

customerRoutes.use(validateToken);
customerRoutes.use(validateRolesMiddleware);

customerRoutes.get("/getone/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const customerData = await CustomerRepository.getById(id);
    delete customerData.password;
    return res.success({
      data: customerData,
      ...HttpStatus.OK,
    });
  } catch (error) {
    next(error);
  }
});

customerRoutes.get(
  "/search",
  validateData(customerBodySearchSchema),
  async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const size = parseInt(req.query.size, 10) || 10;
    console.log(req.query);
    try {
      const data = await CustomerRepository.getAll(
        { limit: size, skip: page - 1 },
        req.query
      );
      data.forEach((d, index) => delete data[index].password);
      return res.success({
        data,
        ...HttpStatus.OK,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default customerRoutes;
