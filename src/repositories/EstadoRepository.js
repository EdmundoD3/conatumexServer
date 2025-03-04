import Estado from "../database/models/EstadoModel"

class EstadoRepository {
    constructor(){}
    static find(estado){
        return Estado.find({ estado})
    }
    static findById(id){
        return Estado.findById(id)
    }
    static async findOrCreateIfNotExist(estado){
        const estadoData = await this.find(estado)
        if(estadoData) return estado
        const newColonia = new Estado(estado)
        return newColonia.save()
    }
    static updateById(id,estado){
        return Estado.findByIdAndUpdate(id,{estado})
    }
}

export default EstadoRepository