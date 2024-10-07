const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Barkeep API',
      version: '1.0.0',
      description: 'API documentation for the Barkeep project',
      contact: {
        name: 'Victor Hsiang',
        email: 'vhsiangyl@gmail.com'
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
          description: 'Development server'
        }
      ]
    }
  },
  apis: ['./routes/*.js', './models/*.js'] // Paths to your route files and model files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs
};
