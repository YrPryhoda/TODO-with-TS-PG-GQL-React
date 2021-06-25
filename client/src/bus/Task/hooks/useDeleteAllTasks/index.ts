import { ApolloError, useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

import { RemovedAllTasks } from './../../../../generated/graphql';

const mutation = loader('./mutation.gql')
const queryAllTasks = loader('../useLoadTasks/queryLoadTasks.gql');


export const useDeleteAllTasks = () => {
  const [_deleteAll, { error, loading, data }] = useMutation<{removeAllTasks: RemovedAllTasks}>(mutation)

  const deleteAll = async () => {
    try {
      return await _deleteAll({
        update: (proxy, { data }) => {
          const res = proxy.readQuery({ query: queryAllTasks })
          if (res && data) {
            const updated = { tasks: [] };

            proxy.writeQuery({ query: queryAllTasks, data: updated })
          }
        }
      });

    } catch (error: unknown) {
      console.log(error as ApolloError);
    }
  }

  return {
    deleteAll,
    loading,
    error,
    count: data && data.removeAllTasks.count
  }
}
