import { Router, Request, Response } from 'express';
import MotoController from '../Controllers/MotoController';

const motoRoutes: Router = Router();

motoRoutes.post('/motorcycles', (req: Request, res: Response) =>
  new MotoController(req, res).create());

motoRoutes.get('/motorcycles', (req: Request, res: Response) =>
  new MotoController(req, res).getAll());

motoRoutes.get('/motorcycles/:id', (req: Request, res: Response) =>
  new MotoController(req, res).getOne());

export default motoRoutes;
