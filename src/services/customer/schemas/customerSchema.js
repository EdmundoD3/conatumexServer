import { Type } from '@sinclair/typebox';

const customerBodySchema = Type.Object({
  name: Type.String({
    minLength: 1,
    errorMessage: {
      type: "Name is required",
    },
  }),
  password: Type.Optional(Type.String({
    minLength: 6,
    errorMessage: {
      type: "Password must be at least 6 characters long",
    },
  })),
  email: Type.Optional(Type.String({
    minLength:6,
    errorMessage: {
      type: "Invalid email format",
    },
  })),
  phone: Type.Optional(Type.String({
    minLength: 10,
    maxLength: 15,
    errorMessage: {
      type: "Phone number must be between 10 and 15 characters",
    },
  })),
  date: Type.Optional(Type.String({ minLength:10 })),
  direction: Type.Object({
    calle: Type.String({
      minLength: 1,
      errorMessage: {
        type: "Street name is required",
      },
    }),
    numeroCasa: Type.Optional(Type.String({
      minLength: 1,
      errorMessage: {
        type: "House number is required",
      },
    })),
    coloniaId: Type.Optional(Type.String({ minLength:10 })),
    ciudadId: Type.Optional(Type.String({ minLength:10 })),
    entreCalles: Type.Optional(Type.String()),
    referencia: Type.Optional(Type.String()),
  }),
  statusId: Type.Optional(Type.String({ minLength:10 })),
  purchases: Type.Optional(Type.Array(Type.String({ minLength:10 }))),
  updatedAt: Type.Optional(Type.String({ minLength:10 })),
}, {
  additionalProperties: false,
  errorMessage: {
    additionalProperties: "The body object format is invalid",
  },
});

export default customerBodySchema