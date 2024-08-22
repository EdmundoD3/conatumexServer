import {  ValidationError } from "../../errors/typeErrors4xx.js";

class Payments {
  constructor({ date, amount, receiptId, userId }) {
    if(!date) throw new ValidationError("Date not found in Paymet")
    if(date instanceof Date) throw new ValidationError("The date is not type Date")
    this.date = new Date(date);
    this.amount = amount;
    this.receiptId = receiptId;
    this.userId = userId;
  }
}
class Note {
    constructor({date,userId,note}){
      if(!date) throw new ValidationError("Date not found in note")
      if(date instanceof Date) throw new ValidationError("The date is not type Date")
        this.date = new Date(date);
        this.userId = userId;
        this.note = note;
    }
}

class CollectionFrequency {
    constructor({amount,frequency}){
        this.amount = amount;
        this.frequency = frequency;
    }
}

export {Payments,Note,CollectionFrequency}