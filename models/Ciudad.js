const mongoose = require('mongoose');

const ciudadSchema = new mongoose.Schema({
  ciudad: String,
});

const Ciudad = mongoose.model('Ciudad', ciudadSchema);

module.exports = Ciudad;