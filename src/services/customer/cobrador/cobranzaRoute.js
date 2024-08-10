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
cobranzaRouter.use(validateRoles(rolesToCobranza));

// await PurchaseRepository.addPrueba()

cobranzaRouter.get("/get-all-purchases", async (req, res, next) => {
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
  "/get-all-purchases-lastDateUpdate/",
  validateData(lastDateUpdateBodySchema),
  async (req, res, next) => {
    const { id } = req.user;
    const { lastDateUpdate } = req.body;

    try {
      const purchasesActive = await PurchaseRepository.findLastDateUpdate(
        id,
        new Date(lastDateUpdate)
      );
      return res.success({
        data: purchasesActive,
        ...HttpStatus.OK,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default cobranzaRouter;
