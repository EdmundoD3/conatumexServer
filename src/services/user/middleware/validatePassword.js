import authByUserNamePassword from "../helpers/authByUserNamePassword.js";

const validatePassword = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await authByUserNamePassword({ username, password });
      req.user = user;
      next()
    } catch (error) {
      next(error);
    }
  };

  export default validatePassword