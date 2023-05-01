import { Request, Response } from 'express';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

const BAD_REQUEST = 'BAD REQUEST';

export default class CarController {
  private req: Request;
  private res: Response;
  private service: CarService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = this.req.body;

    try {
      const newCar: Car | null = await this.service.create(car);
      this.res.status(201).json(newCar);
      return newCar;
    } catch (error) {
      return this.res.status(500).json({ message: BAD_REQUEST });
    }
  }

  public async getAll() {
    try {
      const allCar: ICar[] | null = await this.service.getAll();

      if (allCar) {
        const tranformCars = allCar.map((car) => ({
          id: car.id,
          model: car.model,
          year: car.year,
          color: car.color,
          status: car.status,
          buyValue: car.buyValue,
          doorsQty: car.doorsQty,
          seatsQty: car.seatsQty,
        }));
        return this.res.status(200).json(tranformCars);
      }
      return this.res.status(200).json(allCar);
    } catch (error) {
      return this.res.status(500).json({ message: BAD_REQUEST });
    }
  }

  public async getOne() {
    const { id } = this.req.params;
    try {
      const car: ICar | null = await this.service.getOne(id);

      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }

      return this.res.status(200).json({
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      });
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }

  public async update() {
    const { id } = this.req.params;
    const { body } = this.req;
    try {
      const car: ICar | null = await this.service.update(id, body);

      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }

      return this.res.status(200).json({
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      });
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}
