import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const router = Router()
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Conatumex Api',
      version: '1.0.0',
      description: 'Esta api se encarga de la información de la base de datos de la empresa Conatumex',
    },
  },
  apis: [
    'src/routes/authToken.js',
    'src/routes/customer.js',
    'src/routes/payments.js',
    'src/routes/purchase.js',
    'src/routes/register.js',
    'src/models/Ciudad.js',
    'src/models/Cobrador.js',    
    'src/models/Colonia.js',    
    'src/models/Customer.js',    
    'src/models/Employee.js',
    'src/models/Products.js',
    'src/models/Purchase.js',
  ],
};
const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default router

