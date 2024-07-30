// database.js
import { connect } from 'mongoose';

// Conectar a la base de datos
const PORTMONGODB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/conatumex'

connect( PORTMONGODB).then(() => {
  console.log('Connection to MongoDB established');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

