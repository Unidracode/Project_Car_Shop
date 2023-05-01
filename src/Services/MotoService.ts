import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoModel from '../Models/MotoModel';

export default class MotoService {
  public createCarDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto?.id) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async create(moto: IMotorcycle) {
    const motoModel = new MotoModel();
    const newMoto = await motoModel.create(moto);    
    return this.createCarDomain(newMoto);
  }

  public async getAll() {
    const motoModel = new MotoModel();
    const newMoto = await motoModel.find();    
    return newMoto;
  }

  public async getOne(id: string) {
    const motoModel = new MotoModel();
    const newMoto = await motoModel.findOne(id);    
    return newMoto;
  }
}
