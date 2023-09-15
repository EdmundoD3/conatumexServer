const mongoose = require('mongoose');

const coloniaSchema = new mongoose.Schema({
  colonia: String,
});

const Colonia = mongoose.model('Colonia', coloniaSchema);

module.exports = Colonia;
