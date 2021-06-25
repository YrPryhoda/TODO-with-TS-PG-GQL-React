import { getRepository } from "typeorm";
import { TaskEntity } from "../../entity/Task";
import { BaseRepository } from "../common/base.repository";

export class TasksRepository extends BaseRepository {
  constructor() {
    super();
    this.repository = getRepository(TaskEntity)
  }

  save(data) {
    return this.repository.save(data);
  }

  find() {
    return this.repository.find({
      order: {
        done: 'ASC'
      }
    })
  }

  findByField(fieldObject) {
    return this.repository.findOne(fieldObject)
  }

  deleteOne(id) {
    return this.repository.delete(id)
  }

  async deleteAll() {
    const [tasksArray, count] = await this.repository.findAndCount();

    if (!count) {
      return null;
    }

    const ids = tasksArray.map(el => el.id);
    await this.repository.delete(ids);

    return count;
  }

  updateOne(id, body) {
    return this.repository.update(id, body)
  }
}