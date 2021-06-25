import { pubSub } from "../../../init/pubSub";
import { events } from "./events";

export const subscriptions = {
  addedTask: {
    subscribe: () => pubSub.asyncIterator([events.ADDED_TASK])
  },
  updatedTask: {
    subscribe: () => pubSub.asyncIterator([events.UPDATED_TASK])
  },
  removedTask: {
    subscribe: () => pubSub.asyncIterator([events.DELETED_TASK])
  },
  removedAllTasks: {
    subscribe: () => pubSub.asyncIterator([events.DELETED_ALL_TASKS])
  },
}