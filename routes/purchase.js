import { Router } from "express";
// import User, { findByIdAndUpdate, findById, findByIdAndDelete } from '../models/User';
import findOrCreate from "../helpers/findOrCreate.js";
import Purchase from "../models/Purchase.js";

const customerRouter = Router()


// Ruta para crear un nuevo usuario
customerRouter.post('/', async (req, res) => {
  try {
    const { customerId, vendedor, cobrador, saleDate, creditPrice,
      cashPrice, cashPriceEndDate, collectionDate,
      collectionFrecuency, products = [], payments = [] } = req.body;

    if (!customerId) return res.status(404).json({ error: true, msg: 'customer not exist', status: "Not Created" });
    if (products.length === 0 || !Array.isArray(products))
      return res.status(404).json({ error: true, msg: 'product failed', status: "Not Created" });
    if (!cashPrice || !creditPrice)
      return res.status(404).json({ error: true, msg: 'Prices failed', status: "Not Created" });

    
    // const PurchaseSchema = new Schema({
    //   customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    //   vendedor: { type: Schema.Types.ObjectId, ref: 'Employee' },
    //   cobrador: { type: Schema.Types.ObjectId, ref: 'Employee' },
    //   saleDate: Date,
    //   creditPrice: Number,
    //   cashPrice: Number,
    //   cashPriceEndDate: Date,
    //   collectionDate: Date,
    //   collectionFrequency:String,
    //   products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    //   payments: [{
    //     paymentDate: Date,
    //     amount: Number,
    //     receiptId: String,
    //   }],
    // });



    const coloniaDb = await findOrCreate.coloniaId({ colonia })
    const ciudadDb = await findOrCreate.ciudadId({ ciudad })

    //if name, calle numeroCasa and colonia exist in db, client alredy exist
    const existCustomer = await Purchase.findOne({
      name,
      "direction.calle": calle,
      "direction.numeroCasa": numeroCasa,
      "direction.colonia": coloniaDb._id
    })

    if (existCustomer) return res.status(400).json({ error: true, msg: 'Customer exist', status: "Not Modified" });

    const newDirection = {
      calle,
      numeroCasa,
      colonia: coloniaDb._id,
      ciudad: ciudadDb._id,
      entreCalles,
      referencia,
    }

    const newCustomer = new Customer({
      name,
      phone,
      date,
      direction: newDirection,
    })

    const savedCustomer = await newCustomer.save();
    delete savedCustomer.password
    res.status(201).json({ error: null, msj: 'Customer successfully saved', data: savedCustomer });
  } catch (error) {
    res.status(500).json({ error: true, msj: 'Error creating customer' });
  }
});


// Ruta para actualizar la información de un usuario
customerRouter.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, phone, email, date, direction } = req.body;
    const { calle, numeroCasa, colonia, ciudad, entreCalles, referencia } = direction

    const coloniaDb = await findOrCreate.coloniaId({ colonia })
    const ciudadDb = await findOrCreate.ciudadId({ ciudad })

    const DirectionUpdate = {
      calle,
      numeroCasa,
      colonia: coloniaDb._id,
      ciudad: ciudadDb._id,
      entreCalles,
      referencia,
    }
    const CustomerUpdate = {
      name,
      phone,
      email,
      date,
      direction: DirectionUpdate,
    }

    // Encuentra y actualiza el usuario por su ID
    const CustomerUpdated = await Customer.findByIdAndUpdate(
      userId,
      CustomerUpdate,
      { new: true }
    );
    delete CustomerUpdated.password

    if (!CustomerUpdated)
      return res.status(404).json({ error: null, msj: 'Customer not found' });

    return res.json({ error: null, msj: 'Customer successfully updated', data: CustomerUpdated });
  } catch (error) {
    res.status(500).json({ error: true, msj: 'Error updating client' });
  }
});

customerRouter.get('/:id', async (req, res) => {
  try {
    const CustomerId = req.params.id;
    // Encuentra el usuario por su ID
    const customer = await Customer.findById(CustomerId);

    if (!customer) {
      return res.status(404).json({ error: true, msj: 'Usuario no encontrado' });
    }
    delete customer.password
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: true, msj: 'Error al obtener los datos del usuario' });
  }
});

customerRouter.delete('/:id', async (req, res) => {
  try {
    const CustomerId = req.params.id;

    // Elimina el usuario por su ID
    const deletedCustomer = await Customer.findByIdAndDelete(CustomerId);

    if (!deletedCustomer) {
      return res.status(404).json({ error: true, msj: 'Customer not found' });
    }

    res.status(200).json({ error: null, msj: 'Customer successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: true, msj: 'Error deleting customer' });
  }
});

export default customerRouter