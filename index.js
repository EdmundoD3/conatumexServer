import "./src/database/mongodb.js"
import app from "./src/server/server.js";

const port = process.env.PORT || 3000;

// Inicia el servidor
app.listen(port, () => {
    console.log(`Aplicación de ejemplo escuchando en http://localhost:${port}`);
  });