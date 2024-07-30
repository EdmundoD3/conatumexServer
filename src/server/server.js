// server.js
import express from "express";
import router from "./routes.js";
import { errorHandling } from "../errors/errorHandling.js";
import setupSwagger from "../swagger.js";
import responseMiddleware from "./middleware/responseMiddleware.js";
import * as dotenv from "dotenv";
import configuredCors from "./CORS.js";

dotenv.config()
const app = express();

// Usar el middleware de respuestas en la aplicación
app.use(responseMiddleware);
app.use(express.json()); // Para analizar solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Para analizar solicitudes URL-encoded
app.use(configuredCors());



app.use("/", router);

// Middleware de manejo de errores
app.use(errorHandling);

setupSwagger(app);

export default app;
