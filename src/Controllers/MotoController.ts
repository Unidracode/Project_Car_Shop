import { Request, Response } from 'express';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoService from '../Services/MotoService';

const BAD_REQUEST = 'BAD REQUEST';

export default class MotoController {
  private req: Request;
  private res: Response;
  private service: MotoService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new MotoService();
  }

  public async create() {
    const moto: IMotorcycle = this.req.body;

    try {
      const newMoto: Motorcycle | null = await this.service.create(moto);
      this.res.status(201).json(newMoto);
      return newMoto;
    } catch (error) {
      return this.res.status(500).json({ message: BAD_REQUEST });
    }
  }

  public async getAll() {
    try {
      const newMoto: IMotorcycle[] | null = await this.service.getAll();
      if (newMoto) {
        const tranformMoto = newMoto.map((moto) => ({
          id: moto.id,
          model: moto.model,
          year: moto.year,
          color: moto.color,
          status: moto.status,
          buyValue: moto.buyValue,
          category: moto.category,
          engineCapacity: moto.engineCapacity,
        }));
        return this.res.status(200).json(tranformMoto);
      }
      this.res.status(200).json(newMoto);
      return newMoto;
    } catch (error) {
      return this.res.status(500).json({ message: BAD_REQUEST });
    }
  }

  public async getOne() {
    const { id } = this.req.params;
    try {
      const moto: IMotorcycle | null = await this.service.getOne(id);
      if (!moto) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      if (moto) {
        const tranformMoto = {
          id: moto.id,
          model: moto.model,
          year: moto.year,
          color: moto.color,
          status: moto.status,
          buyValue: moto.buyValue,
          category: moto.category,
          engineCapacity: moto.engineCapacity,
        };
        return this.res.status(200).json(tranformMoto);
      }
      this.res.status(200).json(moto);
      return moto;
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}
