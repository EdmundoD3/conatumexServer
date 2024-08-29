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

class PurchaseRepository {
  static find(param) {
    return Purchase.find(param)
      .populate({
        path: "vendedorId",
        select: "name",
      })
      .populate("statusId")
      .populate({
        path: "products.productId",
      });
  }
  static findWithCustomer(param) {
    return this.find(param).populate({
      path: "customerId",
      populate: {
        path: "purchases statusId direction.coloniaId direction.ciudadId",
      },
      select: "name email phone date direction statusId purchases",
    });
  }
  static findByIdArray(purchases_id = []) {
    return this.find({ _id: { $in: purchases_id } });
  }

  static async notFoundIds(purchases_id = []) {
    const purchasesFinded = await this.findByIdArray(purchases_id);
    const foundIds = purchasesFinded.map((p) => p._id);
    const notFoundIds = purchases_id.filter((id) => !foundIds.includes(id));
    return notFoundIds;
  }

  static async existAllIds(purchases_id) {
    const notFoundIds = await this.notFoundIds(purchases_id);
    if (notFoundIds.length > 0) return false;
    return true;
  }

  static async findActiveByIdCobrador(cobradorId) {
    const query = {
      $and: [{ isActive: true }, { cobradorId }],
    };
    const purchases = await this.find(query).populate({
      path: "customerId",
      populate: {
        path: "statusId direction.coloniaId direction.ciudadId",
      },
    });
    return formatPurchasesAndCustomer(purchases);
  }

  static async findByLastDateUpdate(cobradorId, lastDateUpdate) {
    const query = {
      $and: [
        { cobradorId },
        { isActive: true },
        { updatedAt: { $gt: new Date(lastDateUpdate) } },
      ],
    };
    const purchases = await this.findWithCustomer(query);
    return formatPurchasesAndCustomer(purchases);
  }
  //desde los purchase filtramos por cobrador, y de esos purchases buscamos los clientes que se actualuizaron
  static async findCustomerByLastDateUpdate(cobradorId, lastDateUpdate) {
    const query = { $and: [{ cobradorId }, { isActive: true }] };

    const purchases = await this.find(query).populate({
      path: "customerId",
      populate: {
        path: "purchases statusId direction.coloniaId direction.ciudadId",
      },
      match: { updatedAt: { $gte: lastDateUpdate } },
    });

    const cleanedPurchases = cleanPurchasesWithoutCustomer(purchases);
    return formatCustomerFromPurchase(cleanedPurchases);
  }
  static async updateCobradorPurchases(cobradorId, purchaseUpdates) {
    // const setBulkWriteForCobradorId =setBulkWriteForCobrador(cobradorId)
    // const bulkOps = purchaseUpdates.map(setBulkWriteForCobradorId);
    try {
      // const result = await Purchase.bulkWrite(bulkOps);
      purchaseUpdates.forEach((purchase) =>
        this.updateOneForCobrador(cobradorId, purchase)
      );
    } catch (error) {
      if (error instanceof Error)
        throw new DatabaseError(
          "Hubo un error al almacenar en la base de datos"
        );
      throw error;
    }
  }
  static async updateOneForCobrador(cobradorId, purchasesUpdate) {
    try {
      const purchaseFinded = await Purchase.findOne({
        _id: purchasesUpdate.id,
      });
      if (!purchaseFinded) throw new NotFoundError("Purchase not found");
      const cleanPurchaseForCobradorId = cleanPurchaseForCobrador(cobradorId);
      const newDataWithCobrador = cleanPurchaseForCobradorId(purchasesUpdate);
      const cleanedNotesToAdd = nonMatchingDates(
        purchaseFinded.notes,
        newDataWithCobrador.notes
      );
      const cleanedPaymentsToAdd = nonMatchingDates(
        purchaseFinded.payments,
        newDataWithCobrador.payments
      );
      purchaseFinded.collectionFrequency =
        newDataWithCobrador.collectionFrequency;
      cleanedNotesToAdd.forEach((note) => purchaseFinded.notes.push(note));
      cleanedPaymentsToAdd.forEach((payment) =>
        purchaseFinded.payments.push(payment)
      );
      purchaseFinded.save();
    } catch (error) {
      if (error instanceof Error)
        throw new DatabaseError(
          "Hubo un error al almacenar en la base de datos"
        );
      throw error;
    }
  }
}

export default PurchaseRepository;
