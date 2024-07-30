import Purchase from "../database/models/PurchaseModel.js";

class PurchaseRepository {
  static findByIdArray(purchases_id = []) {
    return Purchase.find({ _id: { $in: purchases_id } });
  }
  static async notFoundIds(purchases_id = []) {
    const purchasesFinded = await this.findByIdArray(purchases_id);

    const foundIds = purchasesFinded.map((p) => p._id);

    const notFoundIds = purchases_id.filter((id) => !foundIds.includes(id));
    return notFoundIds
  }
  static async existAllIds (purchases_id){
    const notFoundIds = await this.notFoundIds(purchases_id)
    if ( notFoundIds.length>0) return false
    return true
  }
  static async findActiveByIdCobrador(idCobrador){
    const query = {
      $and: [
        { isActive: true },
        { cobrador: idCobrador }
      ]
    };
    return Purchase.find(query).toArray()
  }
}

export default PurchaseRepository
