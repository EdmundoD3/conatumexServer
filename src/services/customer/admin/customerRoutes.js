import express from "express";
import validateRoles from "../../middleware/validateRoles.js";
import validateToken from "../../middleware/validateToken.js";
import CustomerRepository from "../../../repositories/CustomerRepository.js";
import HttpStatus from "../../../constants/httpStatus.js";
import validateData from "../../middleware/validateData.js";
import customerBodySearchSchema from "../schemas/customerBodySearchSchema.js";
import { rolesToAdminCustomer } from "../../../../config/allowedRoles.js";


const customerRoutes = express();

customerRoutes.use(validateToken);

const validateCustomerRoles = validateRoles(rolesToAdminCustomer)
customerRoutes.get("/getone/:id",validateCustomerRoles, async (req, res, next) => {
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
  validateCustomerRoles,
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
