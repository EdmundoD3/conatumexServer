import Colonia from "../database/models/ColoniaModel.js";

class ColoniaRepository {
    constructor(){}
    static find(colonia){
        return Colonia.find({colonia})
    }
    static findById(id){
        return Colonia.findById(id)
    }
    static async findOrCreateIfNotExist(colonia){
        const coloniaData = await this.find(colonia)
        if(coloniaData) return colonia
        const newColonia = new Colonia(colonia)
        return newColonia.save()
    }
    static updateById(id,colonia){
        return Colonia.findByIdAndUpdate(id,{colonia})
    }
}

export default ColoniaRepository