import { Model, Schema, model, models } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;

  constructor(
    protected collection: string,
    protected schema: Schema,
  ) {
    this.model = models[collection] || model(collection, schema);
  }
  
  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findOne(id: string): Promise<T | null> {
    if (id) {
      return this.model.findById(id);
    }
    return null;
  }

  public async update(id: string, body: Partial<T>): Promise<T | null> {
    if (id) {
      return this.model.findOneAndUpdate({ _id: id }, body, { new: true });
    }
    return null;
  }
}
