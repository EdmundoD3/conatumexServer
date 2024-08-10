import Status from "../database/models/StatusModel.js";

class StatusRepository {
  static get(status) {
    const statusFinded = Status.findOne({ status });
    return statusFinded;
  }
  static async save(status) {
    const newStatus = new Status({ status });
    return newStatus.save();
  }
  static async getOrSaveIfNotExist(status) {
    const existingStatus = await this.get(status);
    if (existingStatus) return existingStatus;
    return this.save(status);
  }
}

export default StatusRepository;
