import express from "express";
import validateToken from "../../middleware/validateToken.js";
import validateRoles from "../../middleware/validateRoles.js";
import PurchaseRepository from "../../../repositories/purchaseRepository.js";
import HttpStatus from "../../../constants/httpStatus.js";
import { rolesToCobranza } from "../../../../config/allowedRoles.js";
import validateData from "../../middleware/validateData.js";
import lastDateUpdateBodySchema from "../schemas/lastDateUpdateSchema.js";

const cobranzaRouter = express();
cobranzaRouter.use(validateToken);

// await PurchaseRepository.addPrueba()

cobranzaRouter.get("/get-all-purchases", 
  validateRoles(rolesToCobranza), 
  async (req, res, next) => {
  const { id } = req.user;
  try {
    const purchasesActive = await PurchaseRepository.findActiveByIdCobrador(id);
    console.log({ purchasesActive });
    return res.success({
      data: purchasesActive,
      ...HttpStatus.OK,
    });
  } catch (error) {
    next(error);
  }
});

cobranzaRouter.post(
  "/get-lastDateUpdate/",
  validateRoles(rolesToCobranza),
  validateData(lastDateUpdateBodySchema),
  async (req, res, next) => {
    const { id } = req.user;
    const { lastDateUpdate } = req.body;

    try {
      const purchases = await PurchaseRepository.findByLastDateUpdate(
        id,
        new Date(lastDateUpdate)
      );
      const customers = await PurchaseRepository.findCustomerByLastDateUpdate(
        id,
        new Date(lastDateUpdate)
      );
      return res.success({
        data: { purchases, customers },
        ...HttpStatus.OK,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default cobranzaRouter;
