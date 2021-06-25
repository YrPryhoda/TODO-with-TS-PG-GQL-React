import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
export class BaseRepository extends Repository {

  select() {
    return this.find()
  };

  createOne(teacher) {
    return this.save(teacher);
  }

  async updateById(id, newTeacher) {
    await this.update(id, newTeacher);
  }

  deleteOne(id) {
    return this.delete(id)
  }
}