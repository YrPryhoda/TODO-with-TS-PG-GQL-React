import { useSubscription } from '@apollo/client';
import { loader } from 'graphql.macro';

import { Task } from '../../../../generated/graphql';

const subscription = loader('./subscriptions.gql');

export const useOnTaskAdded = () => {
  const { error, loading, data } = useSubscription<{ addedTask: Task }>(subscription);

  return {
    error,
    loading,
    task: data && data.addedTask
  }
}