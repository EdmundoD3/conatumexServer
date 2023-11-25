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
const PORTMONGODB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/conatumex'

connect( PORTMONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connection to MongoDB established');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});


app.use(json());


app.use('/api',router)

app.use('/doc',express.static(__dirname+ '/public'));
// app.get('/doc', (req, res) => {
//   res.sendFile(__dirname + '/public/');
// });

// documentation with swagger

import swagger from './swagger.js'
app.use('/',swagger)

export default app
