import Product from "../database/models/ProductsModel.js";
import Status from "../database/models/StatusModel.js";
import Purchase from "../database/models/PurchaseModel.js";
import { cleanPurchasesWithoutCustomer, formatCustomerFromPurchase, formatPurchasesAndCustomer } from "./helpers/formatPurchase.js";

class PurchaseRepository {
  static find(param) {
    return Purchase.find(param)
      .populate({
        path: "vendedorId",
        select: "name",
      })
      .populate("statusId")
      .populate({
        path: 'products.productId',
      });
  }
  static findWithCustomer(param) {
    return this.find(param)
      .populate({
        path: "customerId",
        populate: {
          path: "purchases statusId direction.coloniaId direction.ciudadId",
        },
        select: "name email phone date direction statusId purchases",
      })
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
    const purchases = await this.find(query).populate("customerId");
    // const cleanedPurchases = cleanPurchasesWithoutCustomer(purchases)
    return formatPurchasesAndCustomer(purchases)
  }

  static async findByLastDateUpdate(cobradorId, lastDateUpdate) {
    const query = {
      $and: [
        { cobradorId },
        { updatedAt: { $gt: new Date(lastDateUpdate) } },
      ],
    };
    const purchases = await this.findWithCustomer(query);
    return formatPurchasesAndCustomer(purchases)
  }
  //desde los purchase filtramos por cobrador, y de esos purchases buscamos los clientes que se actualuizaron
  static async findCustomerByLastDateUpdate(cobradorId, lastDateUpdate) {
    const query = { cobrador: cobradorId }

    const purchases = await this.find(query)
    .populate({
      path: "customer",
      populate: {
        path: "purchases statusId direction.coloniaId direction.ciudadId",
      },
      match: { updatedAt: { $gte: lastDateUpdate } },
    });

    const cleanedPurchases = cleanPurchasesWithoutCustomer(purchases)
    return formatCustomerFromPurchase(cleanedPurchases)
  }
}



export default PurchaseRepository;
