# Conatumex Server

Este es el servidor backend para la aplicación Conatumex. Proporciona una API RESTful para gestionar clientes, compras, cobranzas y más.

---

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Endpoints de la API](#endpoints-de-la-api)
5. [Documentación Swagger](#documentación-swagger)

---

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/EdmundoD3/conatumexServer.git
   cd conatumexServer
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

   ```bash
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/conatumex
   JWT_SECRET=tu_clave_secreta
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

---

## Configuración

| Variable    | Descripción                           | Valor por defecto                   |
| ----------- | ------------------------------------- | ----------------------------------- |
| PORT        | Puerto en el que corre el servidor.   | 3000                                |
| MONGO\_URI  | URI de conexión a MongoDB.            | mongodb://localhost:27017/conatumex |
| JWT\_SECRET | Clave secreta para firmar tokens JWT. | (Obligatorio)                       |

---

## Estructura del Proyecto

```
conatumexServer/
├── src/
│   ├── controllers/    # Controladores de la API
│   ├── models/         # Modelos de Mongoose
│   ├── routes/         # Rutas de Express
│   ├── middleware/     # Middlewares personalizados
│   ├── constants/      # Constantes (HTTP status, roles, etc.)
│   ├── utils/          # Utilidades (formateadores, helpers)
│   ├── config/         # Configuración de la aplicación
│   └── app.js         # Punto de entrada de la aplicación
├── .env.example       # Plantilla de variables de entorno
├── .gitignore         # Archivos ignorados por Git
├── package.json       # Dependencias y scripts
└── README.md         # Este archivo
```

---

## Endpoints de la API

### Cobranza

- **GET** `/cobranza/get-all-purchases`: Obtiene todas las compras activas del cobrador.
- **POST** `/cobranza/get-last-date-update`: Obtiene las compras actualizadas desde una fecha específica.
- **POST** `/cobranza/update-purchases`: Actualiza las compras del cobrador.
- **POST** `/cobranza/ischange`: Verifica si las compras han cambiado de cobrador.

### Autenticación

- **POST** `/auth/login`: Inicia sesión y devuelve un token JWT.
- **POST** `/auth/register`: Registra un nuevo usuario.

---

## Documentación Swagger

La documentación completa de la API está disponible en Swagger. Para acceder a ella:

1. Inicia el servidor.
2. Abre tu navegador y visita:
   ```
   http://localhost:3000/api-docs
   ```

<!-- ---
Configurar un Replica Set en MongoDB
1.- Ejecuta esto en la terminal para detener MongoDB: "mongod --shutdown"
2.- mongod --replSet rs0 --port 27017 --dbpath "C:\ruta... tu path" -->