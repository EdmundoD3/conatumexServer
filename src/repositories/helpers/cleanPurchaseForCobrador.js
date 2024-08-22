import { CollectionFrequency, Note, Payments } from "../models/Purchase.js";

const cleanPurchaseForCobrador =(userId)=> ({ notes, collectionFrequency, payments }) => {
    const updateFields = {};
    if (notes) 
      updateFields.notes = notes.map(note=> new Note({userId,...note}))
    
    if (collectionFrequency) 
      updateFields.collectionFrequency = new CollectionFrequency(collectionFrequency);
    
    if (payments) 
      updateFields.payments = payments.map(payment=>new Payments({userId,...payment}));
    
    return updateFields
  }

export {cleanPurchaseForCobrador }