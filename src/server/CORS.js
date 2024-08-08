import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Lista de orígenes permitidos
const allowedOrigins = process.env.ALLOWED_ORIGIN.split(',').map(origin => origin.trim());

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization','token','refreshtoken','key']
  };

export default () => cors(corsOptions);
