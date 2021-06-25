import { useQuery } from "@apollo/client";
import { loader } from 'graphql.macro';
import { useDispatch } from 'react-redux';

import { Customer } from "../../../../generated/graphql";
import { loginSuccess } from '../../redux/actions';

const query = loader('./queryMe.graphql');

type QueryResult = {
  me: Customer
}

export const useMe = () => {
  const { loading, error, data } = useQuery<QueryResult>(query);
  const dispatch = useDispatch();

  if (!loading && data && data.me) {
    dispatch(loginSuccess(data.me))
  };

  return {
    loading,
    error,
    customer: data && data.me
  }
}