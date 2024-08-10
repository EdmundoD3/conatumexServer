import Purchase from "../database/models/PurchaseModel.js";
import CustomerRepository from "./CustomerRepository.js";
import StatusRepository from "./StatusRepository.js";
import UserRepository from "./UserRepository.js";

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
    return Purchase.find(query)
  }
  static async addPrueba(){
    const {_id: customer} = await CustomerRepository.findById("66a2bbaea6d717009a7d5123")
    const {_id:cobrador} =  await UserRepository.findById("66a2bba4a6d717009a7d398a")
    const {_id:vendedor} =  await UserRepository.findById("66a2bba4a6d717009a7d397a")
    const {_id: status} = await StatusRepository.getOrSaveIfNotExist('active')
    const dataPurchase= {
      customer,
      vendedor,
      cobrador,
      saleDate: new Date("2024-07-25T20:55:00.395+00:00"),
      creditPrice: 1000,
      cashPrice: 700,
      cashPriceEndDate: new Date("2024-07-25T20:55:00.395+00:00"),
      collectionDate: new Date("2024-07-25T20:55:00.395+00:00"),
      collectionFrequency:{amount:"150",frequency:"mes"},
      sentToCobrador: false,
      products: [],
      payments: [{
        paymentDate: new Date(),
        amount: 15000,
        receiptId: "15",
      }],
      updatedAt: new Date(),
      status,
      isActive:true,
    }
    const newPurchase = new Purchase(dataPurchase)
    newPurchase.save()
  }
}

export default PurchaseRepository
