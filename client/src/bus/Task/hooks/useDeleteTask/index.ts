import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

import { Task } from '../../../../generated/graphql';

const mutation = loader('./mutationDeleteTask.gql')
const queryAllTasks = loader('../useLoadTasks/queryLoadTasks.gql');

export const useDeleteTask = () => {
  const [_delete, { loading, error, data }] = useMutation<{ removeTask: Task }>(mutation);

  const deleteItem = async (id: string) => {
    const conf = window.confirm(`Are you sure to delete this task?`)
    if (conf) {
      try {
        await _delete({
          variables: {
            id
          },
          update: (proxy, { data }) => {
            const res = proxy.readQuery<{ tasks: Task[] }>({ query: queryAllTasks });

            if (res && data) {
              const updated = {
                tasks: res.tasks.filter(el => el.id !== id)
              };

              proxy.writeQuery({ query: queryAllTasks, data: updated });
            }
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  return {
    deleteItem,
    loading,
    error,
    data: data && data.removeTask
  }
}