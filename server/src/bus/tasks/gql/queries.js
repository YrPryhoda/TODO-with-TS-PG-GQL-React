import { TasksController } from "../tasks.controller"

const {
  task,
  tasks
} = new TasksController();

export const queries = {
  tasks,
  task
}