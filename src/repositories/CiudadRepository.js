import mongoose from "mongoose";
import Ciudad from "../database/models/CiudadModel.js";

class CiudadRepository {
  constructor() {}
  static findArray(ciudades = []) {
    return Ciudad.find({ ciudad: { $in: ciudades } });
  }
  static findByIdArray(ciudadesId = []) {
    const objectIds = ciudadesId.map((id) => new mongoose.Types.ObjectId(id));
    return Ciudad.find({ _id: { $in: objectIds } });
  }
  static find(ciudad) {
    return Ciudad.find({ ciudad });
  }
  static findById(id) {
    return Ciudad.findById(id);
  }
  static async findOrCreateIfNotExist(ciudad) {
    const ciudadData = await this.find(ciudad);
    if (ciudadData) return ciudadData;
    const newCiudad = new Ciudad(ciudad);
    return newCiudad.save();
  }
  static async findByIdAndUpdate(id, ciudad) {
    return Ciudad.findByIdAndUpdate(id, { ciudad });
  }
}

export default CiudadRepository;
