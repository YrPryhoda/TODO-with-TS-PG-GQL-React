import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import { Task } from '../../../../generated/graphql';

const query = loader('./queryLoadTasks.gql');

export const useLoadTasks = () => {
  const { error, loading, data } = useQuery<{ tasks: Task[] }>(query);

  return {
    error,
    loading,
    tasks: data && data.tasks
  }
}