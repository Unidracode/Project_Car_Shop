import express from 'express';
import carRoutes from './Routes/CarRoutes';
import motoRoutes from './Routes/MotoRoutes';

const app = express();

app.use(express.json());
app.use('/', carRoutes);
app.use('/', motoRoutes);

export default app;
