import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'A simple Express.js API for a todo app',
    },
  },
  apis: [
    './src/routes/*.ts',
    './src/app/application/dtos/request/*.ts',
    './src/app/application/dtos/response/*.ts',
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
