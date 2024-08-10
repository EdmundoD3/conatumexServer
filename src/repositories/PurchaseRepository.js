import Product from "../database/models/ProductsModel.js";
import Purchase from "../database/models/PurchaseModel.js";

class PurchaseRepository {
  static find(param) {
    return Purchase.find(param)
      .populate("customer")
      .populate("vendedor")
      .populate("cobrador")
      .populate("products")
      // .populate("coloniaId");
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
      $and: [{ isActive: true }, { cobrador: cobradorId }],
    };
    return this.find(query);
  }

  static async findLastDateUpdate(cobradorId, lastDateUpdate) {
    const query = {
      $and: [
        { cobrador: cobradorId },
        { updatedAt: { $gt: new Date(lastDateUpdate) } },
      ],
    };
    return this.find(query);
  }
}

export default PurchaseRepository;
