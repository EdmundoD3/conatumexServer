import HttpStatus from "../../constants/httpStatus.js";

const responseMiddleware = (req, res, next) => {
  res.success = ({data, code}) => {
    res.status(code).json({
      success: true,
      data: data,
    });
  };

  res.error = ({code=HttpStatus.INTERNAL_SERVER_ERROR.code, message=HttpStatus.INTERNAL_SERVER_ERROR.message}) => {
    res.status(code).json({
      success: false,
      message: message,
    });
  };

  next();
};

export default responseMiddleware;
