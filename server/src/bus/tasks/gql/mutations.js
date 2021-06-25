import { TasksController } from '../tasks.controller'


const {
  addTask,
  removeTask,
  updateTask,
  removeAllTasks
} = new TasksController();

export const mutations = {
  addTask,
  removeTask,
  updateTask,
  removeAllTasks
}