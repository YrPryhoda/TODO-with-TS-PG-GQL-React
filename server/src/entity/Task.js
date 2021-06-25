import { EntitySchema } from "typeorm";
import { TasksRepository } from "../bus/tasks/tasks.repository";

export const TaskEntity = new EntitySchema({
  name: 'tasks',
  target: TasksRepository,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    title: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    done: {
      type: "boolean",
      default: false
    },
  }
})