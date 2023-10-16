import { Router } from "express";
// import User, { findByIdAndUpdate, findById, findByIdAndDelete } from '../models/User';
import Purchase from "../models/Purchase.js";
import Employee from "../models/Employee.js";
import findOrCreate from "../helpers/findOrCreate.js";

const purchaseRouter = Router()

/**
 * @openapi
 * /api/purchases:
 *   post:
 *     summary: Create a new purchase
 *     description: Create a new purchase with customer information, products, and payments.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: The ID of the customer for the purchase.
 *               vendedor:
 *                 type: string
 *                 description: The name of the seller.
 *               cobrador:
 *                 type: string
 *                 description: The name of the collector.
 *               saleDate:
 *                 type: string
 *                 format: date
 *                 description: The date of the sale in ISO 8601 format.
 *               creditPrice:
 *                 type: number
 *                 description: The price for credit.
 *               cashPrice:
 *                 type: number
 *                 description: The cash price.
 *               cashPriceEndDate:
 *                 type: string
 *                 format: date
 *                 description: The end date for the cash price in ISO 8601 format.
 *               collectionDate:
 *                 type: string
 *                 format: date
 *                 description: The date for collection in ISO 8601 format.
 *               collectionFrequency:
 *                 type: string
 *                 description: The frequency of collection.
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of product IDs.
 *               payments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     paymentDate:
 *                       type: string
 *                       format: date
 *                       description: The date of the payment in ISO 8601 format.
 *                     amount:
 *                       type: number
 *                       description: The payment amount.
 *                     receiptId:
 *                       type: string
 *                       description: The receipt ID (optional).
 *     responses:
 *       '201':
 *         description: Purchase created successfully.
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
 *                   type: object
 *                   description: Details of the created purchase.
 *       '400':
 *         description: Error creating the purchase.
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
purchaseRouter.post('/', async (req, res) => {
  try {
    const { customerId, vendedor, cobrador, saleDate, creditPrice,
      cashPrice, cashPriceEndDate, collectionDate,
      collectionFrequency, products = [], payments = [] } = req.body;

    if (!customerId) return res.status(404).json({ error: true, msg: 'customer not exist', status: "Not Created" });
    if (products.length === 0 || !Array.isArray(products))
      return res.status(404).json({ error: true, msg: 'product failed', status: "Not Created" });
    if (!cashPrice || !creditPrice)
      return res.status(404).json({ error: true, msg: 'Prices failed', status: "Not Created" });

    const vendedorFinded = await Employee.findOne({ name: vendedor })
    if (!vendedorFinded) return res.status(404).json({ error: true, msg: 'vendedor failed', status: "Not Created" });
    const cobradorFinded = await Employee.findOne({ name: cobrador })
    if (!cobradorFinded) return res.status(404).json({ error: true, msg: 'cobrador failed', status: "Not Created" });
    ["plus", "mascarilla"]
    const productsArrayId = await Promise.all(products.map(async product =>
      await findOrCreate.productData({ product })._id
    ))
    const paymetsVerify = payments.map(({ paymentDate, amount, receiptId }) => {
      const NewPaymetDate = paymentDate instanceof Date ? paymentDate : new Date();
      if (typeof amount === "number") throw Error({ message: "amount is not a number" });
      const newReceiptId = !receiptId ? receiptId : "NA"
      return { paymentDate: NewPaymetDate, amount, receiptId: newReceiptId }
    })


    const newPurchase = new Purchase({
      customer: customerId,
      vendedor: vendedorFinded._id,
      cobrador: cobradorFinded._id,
      saleDate,
      creditPrice,
      cashPrice,
      cashPriceEndDate,
      collectionDate,
      collectionFrequency,
      sentToCobrador:false,
      products: productsArrayId,
      payments: paymetsVerify,
    })



    //if name, calle numeroCasa and colonia exist in db, client alredy exist
    const savedPurchase = newPurchase.save()

    res.status(201).json({ error: null, msj: 'Purchase successfully saved', data: savedPurchase });
  } catch (error) {
    res.status(500).json({ error: true, msj: 'Error creating purchase' });
  }
});


// Ruta para actualizar la información de un customer
purchaseRouter.put('/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const { vendedor, cobrador, saleDate, creditPrice,
      cashPrice, cashPriceEndDate, collectionDate,
      collectionFrequency, products = [], payments = [] } = req.body;

    if (!customerId) return res.status(404).json({ error: true, msg: 'customer not exist', status: "Not Created" });
    if (products.length === 0 || !Array.isArray(products))
      return res.status(404).json({ error: true, msg: 'product failed', status: "Not Created" });
    if (!cashPrice || !creditPrice)
      return res.status(404).json({ error: true, msg: 'Prices failed', status: "Not Created" });

    const vendedorFinded = await Employee.findOne({ name: vendedor })
    if (!vendedorFinded) return res.status(404).json({ error: true, msg: 'vendedor failed', status: "Not Created" });
    const cobradorFinded = await Employee.findOne({ name: cobrador })
    if (!cobradorFinded) return res.status(404).json({ error: true, msg: 'cobrador failed', status: "Not Created" });
    ["plus", "mascarilla"]
    const productsArrayId = await Promise.all(products.map(async product =>
      await findOrCreate.productData({ product })._id
    ))
    const paymetsVerify = payments.map(({ paymentDate, amount, receiptId }) => {
      const NewPaymetDate = paymentDate instanceof Date ? paymentDate : new Date();
      if (typeof amount === "number") throw Error({ message: "amount is not a number" });
      const newReceiptId = !receiptId ? receiptId : "NA"
      return { paymentDate: NewPaymetDate, amount, receiptId: newReceiptId }
    })


    const updatedPurchase = {
      customer: customerId,
      vendedor: vendedorFinded._id,
      cobrador: cobradorFinded._id,
      saleDate,
      creditPrice,
      cashPrice,
      cashPriceEndDate,
      collectionDate,
      collectionFrequency,
      sentToCobrador:false,
      products: productsArrayId,
      payments: paymetsVerify,
    }
    const purchaseUpdated = await Purchase.findByIdAndUpdate(customerId, updatedPurchase,
      { new: true });

    res.status(201).json({ error: null, msj: 'Purchase successfully Updated', data: purchaseUpdated });
  } catch (error) {
    res.status(500).json({ error: true, msj: 'Error updating client' });
  }
});

purchaseRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // Encuentra el usuario por su ID
    const purchase = await Purchase.findById(id);

    if (!purchase) {
      return res.status(404).json({ error: true, msj: 'Purchase no encontrado' });
    }
    return res.status(201).json({ error: null, msj: 'Purchase successfully Updated', data: purchase });
  } catch (error) {
    res.status(500).json({ error: true, msj: 'Error getting purchase' });
  }
});

purchaseRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Elimina el usuario por su ID
    const deletedPurchase = await Purchase.findByIdAndDelete(id);

    if (!deletedPurchase) {
      return res.status(404).json({ error: true, msj: 'Purchase not found' });
    }

    return res.status(200).json({ error: null, msj: 'Purchase successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: true, msj: 'Error deleting purchase' });
  }
});

export default purchaseRouter