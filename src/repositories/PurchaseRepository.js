import Product from "../database/models/ProductsModel.js";
import Status from "../database/models/StatusModel.js";
import Purchase from "../database/models/PurchaseModel.js";
import {
  cleanPurchasesWithoutCustomer,
  formatCustomerFromPurchase,
  formatPurchasesAndCustomer,
} from "./helpers/formatPurchase.js";
import { cleanPurchaseForCobrador } from "./helpers/cleanPurchaseForCobrador.js";
import { nonMatchingDates } from "./helpers/nonMatching.js";
import { NotFoundError } from "../errors/typeErrors4xx.js";
import { DatabaseError } from "../errors/typeErrors5xx.js";
import mongoose from "mongoose";

class PurchaseRepository {
  //administrador de sessiones
  async startSession() {
    this.session = await mongoose.startSession();
    this.session.startTransaction();
  }
  async commitTransaction() {
    await  this.session.commitTransaction();
    this.session.endSession();
  }
  async abortTransaction() {
    await this.session.abortTransaction();
    this.session.endSession();
  }
  // Repositorio de la base de datos
  static find(param, session = null) {
    const options = session ? { session } : {}; // Si hay sesión, se agrega
    return Purchase.find(param, null, options)
      .populate({ path: "vendedorId", select: "name" })
      .populate({ path: "cobradorId", select: "name" })
      .populate("statusId")
      .populate({ path: "products.productId" });
  }

  static findWithCustomer(param, session = null) {
    return this.find(param, session).populate({
      path: "customerId",
      populate: {
        path: "purchases statusId direction.coloniaId direction.ciudadId",
      },
      select: "name email phone date direction statusId purchases",
    });
  }

  static findByIdArray(purchases_id = [], session = null) {
    return this.find({ _id: { $in: purchases_id } }, session);
  }

  static async notFoundIds(purchases_id = [], session = null) {
    const purchasesFinded = await this.findByIdArray(purchases_id, session);
    const foundIds = purchasesFinded.map((p) => p._id);
    return purchases_id.filter((id) => !foundIds.includes(id));
  }

  static async existAllIds(purchases_id, session = null) {
    const notFoundIds = await this.notFoundIds(purchases_id, session);
    return notFoundIds.length === 0;
  }

  static async findActiveByIdCobrador(cobradorId, session = null) {
    const query = { $and: [{ isActive: true }, { cobradorId }] };
    const purchases = await this.find(query, session).populate({
      path: "customerId",
      populate: { path: "statusId direction.coloniaId direction.ciudadId" },
    });
    return formatPurchasesAndCustomer(purchases);
  }

  static async findByLastDateUpdate(cobradorId, lastDateUpdate, session = null) {
    const query = {
      $and: [
        { cobradorId },
        { isActive: true },
        { updatedAt: { $gt: new Date(lastDateUpdate) } },
      ],
    };
    const purchases = await this.findWithCustomer(query, session);
    return formatPurchasesAndCustomer(purchases);
  }
  async findByLastDateUpdate(cobradorId, lastDateUpdate){
    return PurchaseRepository.findByLastDateUpdate(cobradorId,lastDateUpdate,this.session)
  }

  static async findCustomerByLastDateUpdate(cobradorId, lastDateUpdate, session = null) {
    const query = { $and: [{ cobradorId }, { isActive: true }] };
    const purchases = await this.find(query, session).populate({
      path: "customerId",
      populate: {
        path: "purchases statusId direction.coloniaId direction.ciudadId",
      },
      match: { updatedAt: { $gte: lastDateUpdate } },
    });

    const cleanedPurchases = cleanPurchasesWithoutCustomer(purchases);
    return formatCustomerFromPurchase(cleanedPurchases);
  }

  static async updateCobradorPurchases(cobradorId, purchaseUpdates, session = null) {
    try {
      for (const purchase of purchaseUpdates) {
        await this.updateOneForCobrador(cobradorId, purchase, session);
      }
    } catch (error) {
      throw new DatabaseError("Hubo un error al almacenar en la base de datos");
    }
  }
  async updateCobradorPurchases(cobradorId, purchaseUpdates){
    PurchaseRepository.updateCobradorPurchases(cobradorId, purchaseUpdates,this.session)
  }

  static async updateOneForCobrador(cobradorId, purchasesUpdate, session = null) {
    try {
      const purchaseFinded = await Purchase.findOne({ _id: purchasesUpdate.id }, null, session ? { session } : {});
      if (!purchaseFinded) throw new NotFoundError("Purchase not found");

      const cleanPurchaseForCobradorId = cleanPurchaseForCobrador(cobradorId);
      const newDataWithCobrador = cleanPurchaseForCobradorId(purchasesUpdate);
      const cleanedNotesToAdd = nonMatchingDates(purchaseFinded.notes, newDataWithCobrador.notes);
      const cleanedPaymentsToAdd = nonMatchingDates(purchaseFinded.payments, newDataWithCobrador.payments);

      purchaseFinded.collectionFrequency = newDataWithCobrador.collectionFrequency;
      cleanedNotesToAdd.forEach((note) => purchaseFinded.notes.push(note));
      cleanedPaymentsToAdd.forEach((payment) => purchaseFinded.payments.push(payment));

      await purchaseFinded.save({ session });
    } catch (error) {
      throw new DatabaseError("Hubo un error al almacenar en la base de datos");
    }
  }

  static async verifyCobrador(ids = [], idToCheck, session = null) {
    const purchases = await Purchase.find({ _id: { $in: ids }, cobradorId: { $ne: idToCheck } }, null, session ? { session } : {});
    return purchases.map(({ _id }) => ({ _id }));
  }
}

export default PurchaseRepository;

