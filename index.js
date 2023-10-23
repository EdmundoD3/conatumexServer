import express from 'express';
import { connect } from 'mongoose';
// import { json } from 'body-parser';
import pkg from 'body-parser';
import { config as dotenvConfig } from 'dotenv';
import router from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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


app.use('/api/',router)



app.get('/doc', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  
});

// documentation with swagger

import swagger from './swagger.js'
app.use('/',swagger)

app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});