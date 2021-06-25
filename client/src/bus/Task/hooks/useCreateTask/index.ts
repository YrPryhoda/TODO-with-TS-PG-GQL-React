import { ApolloError, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

import { Task, TaskInput } from "../../../../generated/graphql";

const mutation = loader('./mutation.gql');
const queryAllTasks = loader('../useLoadTasks/queryLoadTasks.gql');

export const useAddTask = () => {
  const [_addTask, { loading, error, data }] = useMutation<{ addTask: Task }>(mutation);

  const addTask = async (newTask: TaskInput) => {
    try {

      if (!newTask.title) {
        return;
      }

      await _addTask({
        variables: {
          task: newTask
        },
        update: (proxy, { data }) => {
          const response = proxy.readQuery<{ tasks: Task[] }>({ query: queryAllTasks });

          if (response) {
            const updated = {
              tasks: [
                data!.addTask,
                ...response.tasks
              ]
            }
            proxy.writeQuery({ query: queryAllTasks, data: updated });
          }
        }
      });

    } catch (error: unknown) {
      console.log(error as ApolloError);
    }
  }

  return {
    loading,
    error,
    task: data && data.addTask,
    addTask
  }
}