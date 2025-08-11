import express from 'express';
import swaggerDocs from '../doc/swagger.doc';
import swaggerUi from 'swagger-ui-express';
import { ErrorHandler } from '@application/middlewares/error-handler.middleware';
import itemsRouter from './routes/items.routes';

const app = express();

app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/items', itemsRouter);

app.use(ErrorHandler);

export default app;
