import express from "express";
import validateToken from "../../middleware/validateToken.js";
import validateRoles from "../../middleware/validateRoles.js";
import PurchaseRepository from "../../../repositories/purchaseRepository.js";
import HttpStatus from "../../../constants/httpStatus.js";

const cobranzaRouter = express();
const validateRolesMiddleware = validateRoles([
  "66908ca71ee4d75e86b4af9b",
  "667b428689aaeded0c0d9200",
]);

cobranzaRouter.use(validateToken);
cobranzaRouter.use(validateRolesMiddleware);

cobranzaRouter.get("/get-all-purchases",async (req,res,next)=>{
    const {id}=req.user
    try {
        const purchasesActive = await PurchaseRepository.findActiveByIdCobrador(id)
        console.log(purchasesActive);
        return res.success({
            data: purchasesActive,
            ...HttpStatus.OK,
          });
    } catch (error) {
        next(error)
    }
});


export default cobranzaRouter;
