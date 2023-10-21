import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
// import addFormats from "ajv-formats";

const LoginDTOSchema = Type.Object(
  {
    username: Type.String({
      errorMessage: {
        type: "username isn't string",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "password isn't sting",
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

const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body);

  if (!isDTOValid)
    return res.status(400)
      .send({error: true, msj:ajv.errorsText(validate.errors, { separator: "\n" })});

  next();
};

export default validateLoginDTO;
