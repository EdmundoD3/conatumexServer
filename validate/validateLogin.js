import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "Debe ser un string",
        format: "Debe ser un correo electrónico válido",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "Debe ser un string",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es válido",
    },
  }
);

const ajv = new Ajv({ allErrors: true });

addFormats(ajv, ["email"]);
addErrors(ajv, { keepErrors: false });
const validate = ajv.compile(LoginDTOSchema);

const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body);

  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
};

export default validateLoginDTO;


// const validate = {
//   email: (email) => {
//     // avoid XSS
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!email || !emailPattern.test(email))
//       throw error
//   },
//   phone: (phone) => {
//     const phonePattern = /^\d{8,10}$/;
//     if (!phone || !phonePattern.test(data.phone))
//       throw error;
//   },
//   dataString: (data) => {
//     // avoid sql injection
//     const sqlInjectionPattern = /(\bDROP\b|\bDELETE\b|\bUPDATE\b)/i;
//     if (sqlInjectionPattern.test(data)) throw error;

//     const specialCharactersRegex = /[*>{}[\]]/;
//     if (specialCharactersRegex.test(data)) throw error;
//   }
// }