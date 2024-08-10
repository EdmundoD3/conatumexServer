import Customer from "../database/models/CustomerModel.js";
import { ConflictError, NotFoundError } from "../errors/typeErrors4xx.js";
import CiudadRepository from "./CiudadRepository.js";
import ColoniaRepository from "./ColoniaRepository.js";
import { removeEmptyValues } from "./helpers/removeEmptyValues.js";
import PurchaseRepository from "./purchaseRepository.js";

const errorMessage = "Customer not created";
const schema = {
  name: "name",
  phone: "phone",
  calle: "direction.calle",
  numeroCasa: "direction.numeroCasa",
  coloniaId: "direction.coloniaId",
  ciudad: "direction.ciudadId",
  statusId: "statusId",
};

const formatData = (data = {}) => {
  const keys = Object.keys(data);
  const dataCleaned = {};

  keys.forEach((key) => {
    const propertyName = schema[key];
    if (!propertyName) return;
    const datakey = data[key];
    if (!datakey) return;
    dataCleaned[propertyName] = { $regex: datakey, $options: 'i' };
  });
  return dataCleaned;
};

class CustomerRepository {
  constructor() {}
  static async save({
    name,
    password,
    email,
    phone,
    date,
    direction,
    purchases,
    updatedAt,
  }) {
    const directionAddedIds = directionAddIds(direction);
    const newCustomer = new Customer({
      name,
      password,
      email,
      phone,
      date,
      direction: directionAddedIds,
      purchases,
      updatedAt,
    });
    try {
      const saveCustomer = await newCustomer.save();
      if (!saveCustomer) {
        throw new ConflictError(errorMessage);
      }
      return saveCustomer;
    } catch (error) {
      throw new ConflictError(error);
    }
  }

  static async patch(
    id,
    { name, password, email, phone, date, direction, purchases }
  ) {
    try {
      if (!id) throw new NotFoundError("customer id not found");
      const purchasesExistAllIds = await PurchaseRepository.existAllIds(
        purchases
      );
      if (!purchasesExistAllIds)
        throw new NotFoundError("Register purchases previously");
      const CleanData = removeEmptyValues({
        name,
        password,
        email,
        phone,
        date,
      });
      const directionData = await directionAddIds(removeEmptyValues(direction));
      data.updatedAt = new Date();
      const newData = { ...CleanData, direction: directionData };
      return Customer.findByIdAndUpdate(id, newData);
    } catch (error) {
      throw error;
    }
  }
  static async newPurchase(id, purchaseId) {
    const customer = Customer.findById(id);
    const { purchases } = customer;
    const purchaseAlreadyExist = purchases.find((id) => purchaseId == id);
    if (purchaseAlreadyExist) return;
    purchases.push(purchaseId);
    return Customer.findByIdAndUpdate(id, { purchases });
  }
  static getAll({ limit = 10, skip = 0 }, data = {}) {
    const cleanedData = formatData(data);
    return Customer.find(cleanedData)
    .skip(skip)
    .limit(limit);
  }
  static async findById(id) {
    return Customer.findById(id);
  }
  getByData({
    name,
    password,
    email,
    phone,
    date,
    direction: { calle, numeroCasa, colonia, ciudad, entreCalles, referencia },
    purchases: [],
    updatedAt,
  }) {
    throw new Error("inplementar get by data en customer")
  }
}
async function directionAddIds(direction) {
  const { colonia, ciudad } = direction;
  const addedIds = { ...direction };
  if (ciudad)
    addedIds.ciudad = await CiudadRepository.findOrCreateIfNotExist(ciudad);
  if (colonia)
    addedIds.colonia = await ColoniaRepository.findOrCreateIfNotExist(colonia);
  return addedIds;
}

export default CustomerRepository;
