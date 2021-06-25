import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useDispatch } from 'react-redux';
import { BaseSyntheticEvent, useState } from 'react';

import { routes } from '../../../../routes/routes';
import { loginFailed, loginSuccess } from '../../redux/actions';

type Form = {
  email: string;
  password: string;
}

interface IError extends Error {
  message: string
}

const mutation = loader('./mutationLogin.graphql');

export const useLogin = () => {
  const history = useHistory();
  const [_save, { data, loading }] = useMutation(mutation);
  const [error, setError] = useState<IError | null>(null);
  const dispatch = useDispatch();

  const save = async (event: BaseSyntheticEvent, { email, password }: Form) => {
    event.preventDefault();
    try {
      const { data } = await _save({
        variables: {
          email,
          password
        },
      });
      dispatch(loginSuccess(data.login));
      history.push(routes.root)
    } catch (er: any) {
      setError(er as IError)
      dispatch(loginFailed(er.message))
    }
  }

  return {
    save,
    error: error && error.message,
    data,
    loading
  }

}