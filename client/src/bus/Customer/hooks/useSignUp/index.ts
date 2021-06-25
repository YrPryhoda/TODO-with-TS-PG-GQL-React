import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

import { CustomerInput } from '../../../../generated/graphql';
import { routes } from '../../../../routes/routes';

interface IError extends Error { }

export const useSignUp = () => {
  const query = loader('./querySignUp.graphql');
  const history = useHistory();

  const [_save, { loading, data }] = useMutation(query);
  const [error, setError] = useState<IError | null>(null);
  const save = async (customer: CustomerInput) => {
    try {
      await _save({
        variables: {
          customer
        }
      })

      history.push(routes.login)
    } catch (er: unknown) {
      setError(er as IError)
    }
  }

  return {
    loading,
    error,
    customer: data && data.customer,
    save
  }
}