import { TasksRepository } from "./tasks.repository";
import { events } from "./gql/events";
import { pubSub } from "../../init/pubSub";

export class TasksController {
  constructor() {
    this.repository = () => new TasksRepository();
  }

  task = async (parents, vars, context) => {
    try {
      const id = vars.id;
      const task = this.repository().findByField({ id });

      return task
    } catch (error) {
      console.log(error);
    }
  }

  tasks = async () => {
    try {
      const tasks = this.repository().find();

      return tasks
    } catch (error) {
      console.log(error);
    }
  }

  addTask = async (parents, { task }, context) => {
    try {
      const createdTask = await this.repository().createOne(task);

      pubSub.publish(events.ADDED_TASK, {
        addedTask: createdTask
      });

      return createdTask
    } catch (error) {
      console.log(error);
    }
  }

  removeTask = async (parents, { id }, context) => {
    try {
      const task = this.repository().findByField({ id });

      await this.repository().deleteOne(id)

      pubSub.publish(events.DELETED_TASK, {
        removedTask: task
      });

      return task;
    } catch (error) {
      console.log(error);
    }
  }

  updateTask = async (parents, { id, task }, context) => {
    try {
      await this.repository().updateOne(id, task);
      const updatedTask = await this.repository().findByField({ id });

      pubSub.publish(events.UPDATED_TASK, {
        updatedTask
      })

      return updatedTask;
    } catch (error) {
      console.log(error);
    }
  }

  removeAllTasks = async () => {
    try {
      const count = await this.repository().deleteAll();

      pubSub.publish(events.DELETED_ALL_TASKS, {
        removedAllTasks: { count }
      });

      return { count };
    } catch (error) {
      console.log(error);
    }
  }
}