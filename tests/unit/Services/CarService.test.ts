import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarServices from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

const carBody: ICar = {
  id: '1',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const newCar: Car = new Car(carBody);

describe('Testando o service do Car', function () {
  it('testando o método create', async function () {
    sinon.stub(Model, 'create').resolves(newCar);

    // Act
    const service = new CarServices();
    const result = await service.create(carBody);
    
    // Assert
    expect(result).to.be.deep.equal(newCar);
  });

  it('testando o método getAll', async function () {
    sinon.stub(Model, 'find').resolves([newCar]);

    // Act
    const service = new CarServices();
    const result = await service.getAll();
    
    // Assert
    expect(result).to.be.deep.equal([newCar]);
  });

  it('testando o método getOne', async function () {
    sinon.stub(Model, 'findOne').resolves(newCar);

    // Act
    const service = new CarServices();
    const result = await service.getOne('1');
    
    // Assert
    expect(result).to.be.deep.equal(newCar);
  });

  it('testando o método update', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(newCar);

    // Act
    const service = new CarServices();
    const result = await service.update('1', carBody);
    
    // Assert
    expect(result).to.be.deep.equal(newCar);
  });
});
