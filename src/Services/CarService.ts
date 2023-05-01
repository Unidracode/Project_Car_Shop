import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/CarModel';

export default class CarService {
  public createCarDomain(car: ICar | null): Car | null {
    if (car?.id) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carModel = new CarModel();
    const newCar = await carModel.create(car);    
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carModel = new CarModel();
    const allCar = await carModel.find();    
    return allCar;
  }

  public async getOne(id: string) {
    const carModel = new CarModel();
    const car = await carModel.findOne(id);    
    return car;
  }

  public async update(id: string, body: ICar) {
    const carModel = new CarModel();
    const car = await carModel.update(id, body);    
    return car;
  }
}