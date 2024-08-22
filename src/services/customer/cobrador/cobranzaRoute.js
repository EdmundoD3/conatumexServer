import express from "express";
import validateToken from "../../middleware/validateToken.js";
import validateRoles from "../../middleware/validateRoles.js";
import PurchaseRepository from "../../../repositories/purchaseRepository.js";
import HttpStatus from "../../../constants/httpStatus.js";
import { rolesToCobranza } from "../../../../config/allowedRoles.js";
import validateData from "../../middleware/validateData.js";
import lastDateUpdateBodySchema from "../schemas/lastDateUpdateSchema.js";
import cobradorPurchaseUpdateBodySchema from "../schemas/cobradorPurchaseUpdateBodySchema.js";

const cobranzaRouter = express();
cobranzaRouter.use(validateToken);
cobranzaRouter.use(validateRoles(rolesToCobranza));

// await PurchaseRepository.addPrueba()

cobranzaRouter.get("/get-all-purchases", async (req, res, next) => {
  const { id } = req.user;

  try {
    const purchasesActive = await PurchaseRepository.findActiveByIdCobrador(id);
    const dateUpdate = new Date();
    return res.success({
      data: { client: purchasesActive, dateUpdate },
      ...HttpStatus.OK,
    });
  } catch (error) {
    next(error);
  }
});

cobranzaRouter.post(
  "/get-lastDateUpdate/",
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
      const dateUpdate = new Date();
      return res.success({
        data: { purchases, customers, dateUpdate },
        ...HttpStatus.OK,
      });
    } catch (error) {
      next(error);
    }
  }
);

cobranzaRouter.post(
  "/update-purchases",
  validateData(cobradorPurchaseUpdateBodySchema),
  async (req, res, next) => {
    const { id } = req.user;
    const {data} = req.body;

    try {
      
      await PurchaseRepository.updateCobradorPurchases(
      id,data
    );
      const dateUpdate = new Date();
      return res.success({
        data: { dateUpdate },
        ...HttpStatus.OK,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default cobranzaRouter;
