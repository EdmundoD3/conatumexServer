const router = require('express').Router()

const mongoose = require('mongoose');


// Ruta para crear un nuevo pago
router.post('/', async (req, res) => {
  const { id, date, cantidad, folio } = req.body;
  const purchaseId = id
  try {
    // Supongamos que tienes información del nuevo pago
    const nuevoPago = {
      fechaPago: new Date(date),
      cantidad: cantidad,
      folio: folio | null,
    };

    // First, find the existing purchase by its ID
    Compra.findById(purchaseId)
      .then((existingPurchase) => {
        if (!existingPurchase) {
          // Maneja el caso en el que no se encuentra la compra
          console.log('Compra no encontrada');
          return;
        }

        // Add the new payment to the payments array
        existingPurchase.pagos.push(nuevoPago);
        return existingPurchase.save();
      })
      .then((updatedPurchase) => {
        if (updatedPurchase) {
          console.log('Pago agregado con éxito a la compra:', updatedPurchase);
          res.status(201).json(
            { 
              error: null, 
              mensaje: 'Pago creado exitosamente', 
              updatedPurchase 
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



module.exports = router