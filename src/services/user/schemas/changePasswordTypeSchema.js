import { Type } from "@sinclair/typebox";


const changePasswordTypeSchema = Type.Object({
    username: Type.String({
      minLength: 6,
      errorMessage: {
        type: "username  is not in the correct format",
      },
    }),
    password: Type.String({
      minLength: 6,
      errorMessage: {
        type: "password  is not in the correct format",
      },
    }),
    newpassword: Type.String({
        minLength: 6,
        errorMessage: {
          type: "password  is not in the correct format",
        },
      }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "The body object format is invalid",
    },
  }
);

export default changePasswordTypeSchema