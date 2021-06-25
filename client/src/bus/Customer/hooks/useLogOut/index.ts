import { useHistory } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { loader } from 'graphql.macro';

import { Customer } from "../../../../generated/graphql";
import { routes } from '../../../../routes/routes';

type MutationType = {
  logout: Customer
}

export const useLogOut = () => {
  const mutation = loader('./mutationLogOut.graphql');
  const history = useHistory();
  const [_logout, { loading, error, data }] = useMutation<MutationType>(mutation);

  const logout = async () => {
    try {
      const result = await _logout();

      if (result) {
        history.push(routes.login)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    logout,
    loading,
    error,
    customer: data && data.logout
  }

}