import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

import { TaskUpdateInput } from './../../../../generated/graphql';
import { Task } from "../../../../generated/graphql";

const mutation = loader('./mutationUpdateTask.gql')

export const useUpdateTask = () => {
  const [_update, { error, loading }] = useMutation<{ updateTask: Task }>(mutation);


  const updateStatus = async (id: string, done: boolean) => {
    try {
      await _update({
        variables: {
          id,
          task: { done: !done }
        }
      })

    } catch (error) {
      console.log(error);
    }
  }

  const updateTask = async (id: string, task: TaskUpdateInput) => {

  }

  return {
    updateStatus,
    updateTask,
    loading,
    error
  }
}