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
  apis: ['routes/authToken.js',
  'routes/customer.js', 
  'routes/payments.js',
  'routes/purchase.js',
  'routes/register.js'
],
};
const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default router

