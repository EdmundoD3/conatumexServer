import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Registration API',
      version: '1.0.0',
    },
  },
  apis: ['./src/services/user/register/register.js',
    './src/services/user/auth/auth.js',
    './src/services/user/schemas/*', // user middleware schemas
    './src/database/models/*'
  ], // Rutas a tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', serve, setup(swaggerSpec));
};

export default setupSwagger;
