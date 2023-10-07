import { Router } from "express";
// import User, { findByIdAndUpdate, findById, findByIdAndDelete } from '../models/User';
import Purchase from "../models/Purchase.js";
import Employee from "../models/Employee.js";
import findOrCreate from "../helpers/findOrCreate.js";

const purchaseRouter = Router()


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