const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000;
const PORTMONGODB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/conatumex'

mongoose.connect( PORTMONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión a MongoDB establecida');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});


app.use(bodyParser.json());

const routes = require('./routes')
app.use('/',routes)


app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
