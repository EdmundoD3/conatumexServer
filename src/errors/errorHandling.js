import HttpStatus from "../constants/httpStatus.js";

// errorHandling.js
const errorHandling = (err, req, res, next) => {
  if (400 <= err?.statusCode <= 499)
    return res.error({ message: err.message, code: err.statusCode });

  if (err?.statusCode <= 500)
    return res.error({ message: err.message, code: err.statusCode });

  const code = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code;
  const message = err.message || HttpStatus.INTERNAL_SERVER_ERROR.message;
  return res.error({ code, message });
};

export { errorHandling };
