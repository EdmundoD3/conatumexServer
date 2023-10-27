import { Router } from 'express';
import Purchase from '../models/Purchase.js';
import validatePayment from '../validate/validatePayments.js';

const router = Router()

/**
 * @openapi
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     description: Create a new payment for an existing purchase.
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purchaseId:
 *                 type: string
 *                 description: ID of the purchase to which the payment will be associated.
 *               paymentDate:
 *                 type: string
 *                 format: date
 *                 description: Payment date in ISO 8601 format.
 *               amount:
 *                 type: number
 *                 description: Payment amount.
 *               receiptId:
 *                 type: string
 *                 nullable: true
 *                 description: ID of the receipt associated with the payment (optional).
 *     responses:
 *       '201':
 *         description: Payment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 data:
 *                   type: object
 *                   description: Details of the created payment.
 *       '400':
 *         description: Error creating the payment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.post('/', validatePayment, async (req, res) => {
  const { purchaseId, paymentDate, amount, receiptId } = req.body;

  try {
    const newPayment = {
      paymentDate,
      amount,
      receiptId: receiptId | null,
    };

    // First, find the existing purchase by it's ID
    const purchaseFinded = await Purchase.findById(purchaseId)

    if (!purchaseFinded) {
      return res.status(401).json(
        {
          error: null,
          msj: 'Payment was not created',
          data: purchaseFinded
        });
    }

    // Add the new payment to the payments array
    purchaseFinded.pagos.push(newPayment);
    const updatedPurchase = purchaseFinded.save();

    if (!updatedPurchase) {
      return res.status(401).json(
        {
          error: null,
          msj: 'Payment was not created',
          data: purchaseFinded
        });
    }
    console.log('Pago agregado con éxito a la compra:', updatedPurchase);
    return res.status(201).json(
      {
        error: null,
        msj: 'Payment was added',
        data: updatedPurchase
      });

  } catch (error) {
    res.status(400).json({ error: 'Error creating payment' });
  }
});

// Route search for a purchase id
/**
 * @openapi
 * /api/payments/{purchaseId}:
 *   get:
 *     summary: Search for a purchase by ID
 *     description: Retrieve purchase details by providing its unique ID.
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the purchase to search for.
 *     responses:
 *       '200':
 *         description: Purchase details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                 data:
 *                   type: array
 *                   description: List of payments associated with the purchase.
 *       '404':
 *         description: Purchase not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: true
 *                 msj:
 *                   type: string
 *                   description: Error message.
 *                 data:
 *                   type: array
 *                   description: Empty array (no payments found).
 *       '400':
 *         description: Error searching payments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: true
 *                 msj:
 *                   type: string
 *                   description: Error message.
 */
router.get('/:purchaseId', async (req, res) => {
  const { purchaseId } = req.params
  try {

    // First, find the existing purchase by its ID
    const purchaseFinded = await Purchase.findById(purchaseId)
    if (!purchaseFinded) {
      // Maneja el caso en el que no se encuentra la compra
      return res.status(404).json(
        {
          error: true,
          msj: "Payments not found",
          data: []
        });
    }
    return res.status(201).json(
      {
        error: null,
        data: purchaseFinded.payments
      });

  } catch (error) {
    res.status(400).json({ error: true, msj: 'error searching payments' });
  }
});


/**
 * @openapi
 * /api/payments/{purchaseId}:
 *   put:
 *     summary: Update or create a payment for a purchase
 *     description: Update an existing payment or create a new one for a specific purchase.
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the purchase to which the payment will be associated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentDate:
 *                 type: string
 *                 format: date
 *                 description: Payment date in ISO 8601 format.
 *               amount:
 *                 type: number
 *                 description: Payment amount.
 *               receiptId:
 *                 type: string
 *                 description: ID of the receipt associated with the payment.
 *     responses:
 *       '201':
 *         description: Payment updated or created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                 msj:
 *                   type: string
 *                   description: Success message.
 *                 data:
 *                   type: array
 *                   description: List of payments associated with the purchase after the update.
 *       '400':
 *         description: Error updating or creating the payment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: true
 *                 msj:
 *                   type: string
 *                   description: Error message.
 */
router.put('/:purchaseId', async (req, res) => {
  const { purchaseId } = req.params
  const { paymentDate, amount, receiptId } = req.body
  if (!amount) return res.status(404).json(
    {
      error: true,
      msj: 'Amount not found',
      data: []
    });

  try {
    // First, find the existing purchase by it's ID
    const purchaseFinded = await Purchase.findById(purchaseId)

    if (!purchaseFinded) {
      return res.status(401).json(
        {
          error: true,
          msj: 'Payment not found',
          data: []
        });
    }

    const newPayment = {
      paymentDate, amount, receiptId
    }
    // Add the new payment to the payments array
    purchaseFinded.payments.push(newPayment);
    const updatedPurchase = purchaseFinded.save();
    if (!updatedPurchase) {
      return res.status(401).json(
        {
          error: true,
          msj: 'Payment was not created',
          data: purchaseFinded.payments
        });
    }
    return res.status(201).json(
      {
        error: null,
        msj: 'Payment was added',
        data: updatedPurchase.payments
      });

  } catch (error) {
    res.status(400).json({ error: true, msj: 'Error creating payment' });
  }
});

/**
 * @openapi
 * /api/payments/{purchaseId}/{paymentIndex}:
 *   delete:
 *     summary: Delete a payment from a purchase
 *     description: Delete a payment from a specific purchase by providing its purchase ID and the index of the payment.
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the purchase from which to delete the payment.
 *       - in: path
 *         name: paymentIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the payment to be deleted.
 *     responses:
 *       '201':
 *         description: Payment deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                 msj:
 *                   type: string
 *                   description: Success message.
 *                 data:
 *                   type: array
 *                   description: List of payments associated with the purchase after the deletion.
 *       '404':
 *         description: Payment not found or purchase not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                 msj:
 *                   type: string
 *                   description: Error message.
 *                 data:
 *                   type: array
 *                   description: List of payments associated with the purchase.
 *       '401':
 *         description: Index not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                 msj:
 *                   type: string
 *                   description: Error message.
 *                 data:
 *                   type: array
 *                   description: List of payments associated with the purchase.
 *       '400':
 *         description: Error deleting the payment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.delete('/:purchaseId/:paymentIndex', async (req, res) => {
  const { purchaseId, paymentIndex } = req.params

  try {
    // First, find the existing purchase by it's ID
    const purchaseFinded = await Purchase.findById(purchaseId)

    if (!purchaseFinded) {
      return res.status(404).json(
        {
          error: null,
          msj: 'Payment not found',
          data: purchaseFinded.payments
        });
    }

    //  verify valid index
    if (paymentIndex <= 0 || paymentIndex > purchaseFinded.payments.length)
      return res.status(401).json(
        {
          error: null,
          msj: 'index not found',
          data: purchaseFinded.payments
        });

    // Delete payment at specified position
    purchaseFinded.payments.splice(paymentIndex, 1);

    // Save the updated client
    purchaseFinded.save()

    return res.status(201).json(
      {
        error: null,
        msj: 'Payment deleted',
        data: purchaseFinded.payments
      });

  } catch (error) {
    res.status(400).json({ error: 'Error creating payment' });
  }
});

export default router