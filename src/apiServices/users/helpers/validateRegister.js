import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";
// import addFormats from "ajv-formats";


const LoginDTOSchema = Type.Object(
  {
    name: Type.String({
      errorMessage: {
        type: "name isn't string",
      },
    }),
    username: Type.String({
      errorMessage: {
        type: "username isn't string",
      },
    }),
    phone: Type.Optional(Type.String({
      errorMessage: {
        type: "phone isn't string",
      },
    })),
    email: Type.Optional(Type.String({
      format: "email",
      errorMessage: {
        type: "email isn't string",
      },
    })),
    password: Type.String({
      errorMessage: {
        type: "password isn't sting",
      },
    }),
    roles:Type.Array(Type.String({
      errorMessage: {
        type: "roles isn't string",
      },
    })),
    isActive: Type.Optional(Type.Boolean({
      errorMessage: {
        type: "is active isn't string",
      },
    })),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "The object format is invalid",
    },
  }
);

const ajv = new Ajv({ allErrors: true });

addFormats(ajv, ["email"]);
addErrors(ajv, { keepErrors: false });
const validate = ajv.compile(LoginDTOSchema);

const validateRegister = (req, res, next) => {
  const isDTOValid = validate(req.body);

  if (!isDTOValid)
    return res.status(400)
      .send({error: true, msj:ajv.errorsText(validate.errors, { separator: "\n" })});

  next();
};

export default validateRegister;