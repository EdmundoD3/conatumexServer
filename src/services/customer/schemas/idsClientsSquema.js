import { Type } from "@sinclair/typebox";

const idPurchaseBodySchema = Type.Object(
  {
    data: Type.Array(),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "The body object format is invalid",
    },
  }
);

export default idPurchaseBodySchema;
