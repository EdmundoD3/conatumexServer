import { Type } from "@sinclair/typebox";

const customerBodySearchSchema = Type.Object(
  {
    name: Type.Optional(
      Type.String({
        errorMessage: {
          type: "Name is required",
        },
      })
    ),
    phone: Type.Optional(
      Type.String({
        errorMessage: {
          type: "Phone number must be between 10 and 15 characters",
        },
      })
    ),
    calle: Type.Optional(Type.String({
      errorMessage: {
        type: "Street name is required",
      },
    })),
    numeroCasa: Type.Optional(
      Type.String({
        errorMessage: {
          type: "House number is required",
        },
      })
    ),
    coloniaId: Type.Optional(Type.String({ minLength: 10 })),
    ciudadId: Type.Optional(Type.String({ minLength: 10 })),
    statusId: Type.Optional(Type.String({ minLength: 10 })),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "The body object format is invalid",
    },
  }
);

export default customerBodySearchSchema;
