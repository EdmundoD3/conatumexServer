import { Type } from "@sinclair/typebox";

const registerUserSchema = Type.Object(
  {
    name: Type.String({
      minLength: 4,
      errorMessage: {
        type: "name isn't string",
      },
    }),
    username: Type.String({
      minLength: 6,
      errorMessage: {
        type: "username isn't string",
      },
    }),
    phone: Type.Optional(
      Type.String({
        errorMessage: {
          type: "phone isn't string",
        },
      })
    ),
    email: Type.Optional(
      Type.String({
        errorMessage: {
          type: "email isn't string",
        },
      })
    ),
    password: Type.String({
      minLength: 6,
      errorMessage: {
        type: "password isn't sting",
      },
    }),
    roles: Type.Array(
      Type.String({
        errorMessage: {
          type: "roles isn't string",
        },
      })
    ),
    isActive: Type.Boolean({
      errorMessage: {
        type: "is active isn't string",
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

export default registerUserSchema