import express from 'express';
import { connect } from 'mongoose';
// import { json } from 'body-parser';
import pkg from 'body-parser';
import { config as dotenvConfig } from 'dotenv';
import routes from './routes/index.js';
dotenvConfig();
const { json } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;
const PORTMONGODB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/conatumex'

connect( PORTMONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión a MongoDB establecida');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});


app.use(json());


app.use('/',routes)


app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
