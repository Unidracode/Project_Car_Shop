import { Router, Request, Response } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes: Router = Router();

carRoutes.put('/cars/:id', (req: Request, res: Response) =>
  new CarController(req, res).update());

carRoutes.get('/cars/:id', (req: Request, res: Response) =>
  new CarController(req, res).getOne());

carRoutes.post('/cars', (req: Request, res: Response) =>
  new CarController(req, res).create());

carRoutes.get('/cars', (req: Request, res: Response) =>
  new CarController(req, res).getAll());

export default carRoutes;
