import { Type } from "@sinclair/typebox";

const cobradorPurchaseActualizeBodySchema = Type.Object(
  {
    lastDateUpdate:
      Type.String({
        errorMessage: {
          type: "last date update is required",
        },
      }),
    data: Type.Array(
      Type.Object({
        id: Type.String({
          minLength: 1,
          errorMessage: {
            type: "id is required",
          },
        }),
        notes: Type.Optional(
          Type.Array(
            Type.Object({
              date: Type.String({
                minLength: 6,
                errorMessage: {
                  type: "date is required",
                },
              }),
              note: Type.String({
                errorMessage: {
                  type: "note is required",
                },
              }),
            })
          )
        ),
        collectionFrequency: Type.Optional(
          Type.Object({
            frequency: Type.String({
              minLength: 2,
              maxLength: 4,
              errorMessage: {
                type: "collectionFrequency is required",
              },
            }),
            amount: Type.String({
              errorMessage: {
                type: "collectionFrequency is required",
              },
            }),
          })

        ),
        payments: Type.Optional(
          Type.Array(
            Type.Object({
              date: Type.String({
                minLength: 6,
                errorMessage: {
                  type: "date is required",
                },
              }),
              amount: Type.Number({
                minimum: 50,
                errorMessage: {
                  type: "amount is required",
                },
              }),
              receiptId: Type.String({
                errorMessage: {
                  type: "date is required",
                },
              }),
            })
          )
        ),
      })
    ),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "The body object format is invalid",
    },
  }
);

export default cobradorPurchaseActualizeBodySchema;
