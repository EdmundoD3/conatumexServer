import { Router } from 'express';
import Purchase from '../models/Purchase';


const router = Router()


// Ruta para crear un nuevo pago
router.post('/', async (req, res) => {
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
      return res.status(201).json(
        {
          error: null,
          mensaje: 'Payment was not created',
          data: purchaseFinded
        });
    }

    // Add the new payment to the payments array
    purchaseFinded.pagos.push(newPayment);
    const updatedPurchase = purchaseFinded.save();

    if (!updatedPurchase) {
      return res.status(201).json(
        {
          error: null,
          mensaje: 'Payment was not created',
          data: purchaseFinded
        });
    }
    console.log('Pago agregado con éxito a la compra:', updatedPurchase);
    return res.status(201).json(
      {
        error: null,
        mensaje: 'Payment was added',
        data: updatedPurchase
      });

  } catch (error) {
    res.status(400).json({ error: 'Error creating payment' });
  }
});

// Ruta buscar un pago
router.get('/:id', async (req, res) => {
  const { id: purchaseId } = req.params
  try {

    // First, find the existing purchase by its ID
    Purchase.findById(purchaseId)
      .then((existingPurchase) => {
        if (!existingPurchase) {
          // Maneja el caso en el que no se encuentra la compra
          console.log('Compra no encontrada');
          return;
        }

        return existingPurchase.payments;
      })
      .then((PurchasePayments) => {
        if (PurchasePayments) {
          console.log('Pago agregado con éxito a la compra:', PurchasePayments);
          res.status(201).json(
            {
              error: null,
              data: PurchasePayments
            });
        }
      })
      .catch((error) => {
        console.error('Error al agregar el pago:', error);
      });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Ruta buscar los pagos
router.get('/purchase/:id', async (req, res) => {
  const id = req.params

  try {
    // First, find the existing purchase by it's ID
    const purchaseFinded = await Purchase.findById(id)

    if (!purchaseFinded) {
      return res.status(201).json(
        {
          error: null,
          mensaje: 'Payment not found',
          data: purchaseFinded.payments
        });
    }

    // Add the new payment to the payments array
    existingPurchase.pagos.push(newPayment);
    const updatedPurchase = existingPurchase.save();
    if (!updatedPurchase) {
      return res.status(201).json(
        {
          error: null,
          mensaje: 'Payment was not created',
          data: purchaseFinded.payments
        });
    }
    console.log('Pago agregado con éxito a la compra:', updatedPurchase);
    return res.status(201).json(
      {
        error: null,
        mensaje: 'Payment was added',
        data: updatedPurchase.payments
      });

  } catch (error) {
    res.status(400).json({ error: 'Error creating payment' });
  }
});

// Ruta eliminar los pagos
router.delete('/purchase/:id/:index', async (req, res) => {
  const { id, index: paymentIndex } = req.params

  try {
    // First, find the existing purchase by it's ID
    const purchaseFinded = await Purchase.findById(id)

    if (!purchaseFinded) {
      return res.status(201).json(
        {
          error: null,
          mensaje: 'Payment not found',
          data: purchaseFinded.payments
        });
    }

    //  Verificar si el índice es válido
    if (paymentIndex <= 0 || paymentIndex > purchaseFinded.payments.length)
      return res.status(201).json(
        {
          error: null,
          mensaje: 'index not found',
          data: purchaseFinded.payments
        });

    // Delete payment at specified position
    purchaseFinded.payments.splice(paymentIndex, 1);

    // Save the updated client
    const savedPayment = purchaseFinded.save()

    return res.status(201).json(
      {
        error: null,
        mensaje: 'Payment created',
        data: purchaseFinded.payments
      });

  } catch (error) {
    res.status(400).json({ error: 'Error creating payment' });
  }
});
export default router