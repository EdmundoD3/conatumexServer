import Ajv from "ajv";
import addErrors from "ajv-errors";
import { ValidationError } from "../../errors/typeErrors4xx.js";

const validateData = (BodyDTOSchema) => {
  const ajv = new Ajv({ allErrors: true });
  addErrors(ajv, { keepErrors: false });
  const validateBody = ajv.compile(BodyDTOSchema);

  return (req, res, next) => {
    const isBodyValid = validateBody(req.body);
    if (!isBodyValid) {
      const messageError = JSON.stringify(
        ajv.errorsText(validateBody.errors, { separator: "\n" })
      );
      throw new ValidationError(messageError);
    }
    next();
  };
};

export default validateData;
