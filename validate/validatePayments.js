import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
// import addFormats from "ajv-formats";

const LoginDTOSchema = Type.Object(
  {
    purchaseId: Type.String({
      errorMessage: {
        type: "purchaseId isn't string",
      },
    }),
    paymentDate: Type.Date({
      errorMessage: {
        type: "paymentDate isn't Date",
      },
    }),
    amount:Type.Number({
      errorMessage: {
        type: "amount isn't Number",
      },
    }),
    receiptId:Type.String({
      errorMessage: {
        type: "recipeId isn't sting",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "The object format is invalid",
    },
  }
);

const ajv = new Ajv({ allErrors: true });

addErrors(ajv, { keepErrors: false });
const validate = ajv.compile(LoginDTOSchema);

const validatePayment = (req, res, next) => {
  const isDTOValid = validate(req.body);

  if (!isDTOValid)
    return res.status(400)
      .send({error: true, ...ajv.errorsText(validate.errors, { separator: "\n" })});

  next();
};

export default validatePayment;