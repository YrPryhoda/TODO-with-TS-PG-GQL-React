import { getRepository } from "typeorm";
import { CustomerEntity } from "../../entity/Customer";
import { BaseRepository } from "../common/base.repository";

export class CustomersRepository extends BaseRepository {
  constructor() { 
    super();
    this.repository = getRepository(CustomerEntity)
  }

  signUp(data) {
    return this.repository.save(data);
  }

  findAll() {
    return this.repository.find();
  }

  findByField(fieldObject) {
    return this.repository.findOne(fieldObject)
  }

  deleteOne(id) {
    return this.repository.delete(id)
  }

  updateOne(id, body) {

    return this.repository.update(id, body)
  }
}
