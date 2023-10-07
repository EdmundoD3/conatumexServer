import { Router } from "express";
// import User, { findByIdAndUpdate, findById, findByIdAndDelete } from '../models/User';
import Customer from '../models/Customer.js';
import findOrCreate from "../helpers/findOrCreate.js";

const customerRouter = Router()


// Ruta para crear un nuevo usuario
customerRouter.post('/', async (req, res) => {
  try {
    const { name, phone = "NA", date = new Date(), direction = "NA" } = req.body;
    const { calle = "NA", numeroCasa = "NA", colonia = "NA", ciudad = "NA", entreCalles = "NA", referencia = "NA" } = direction

    if (!name) return res.status(404).json({ error: true, msg: 'name not exist', status: "Not Created" });

    const coloniaDb = await findOrCreate.coloniaData({ colonia })
    const ciudadDb = await findOrCreate.ciudadData({ ciudad })

    //if name, calle numeroCasa and colonia exist in db, client alredy exist
    const existCustomer = await Customer.findOne({
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
    const customerId = req.params.id;
    const { name, phone, email, date, direction } = req.body;
    const { calle, numeroCasa, colonia, ciudad, entreCalles, referencia } = direction

    const coloniaDb = await findOrCreate.coloniaData({ colonia })
    const ciudadDb = await findOrCreate.ciudadData({ ciudad })

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
      customerId,
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