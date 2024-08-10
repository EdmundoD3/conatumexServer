import { Type } from "@sinclair/typebox";

const lastDateUpdateBodySchema = Type.Object(
  {
    lastDateUpdate: Type.Optional(
      Type.String({
        errorMessage: {
          type: "last date update is required",
        },
      })
    )
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "The body object format is invalid",
    },
  }
);

export default lastDateUpdateBodySchema;
