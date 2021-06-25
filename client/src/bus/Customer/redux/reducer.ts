import { Customer } from './../../../generated/graphql';
import { LOGIN_FAIL, LOGIN_SUCCESS, LoginFailed, LoginSuccess } from './actions';

type ActionTypes = LoginFailed | LoginSuccess;

interface StateType {
  me: Customer | null,
  loginError: string,
  signUpError: string
}

const initialState: StateType = {
  me: null,
  loginError: '',
  signUpError: ''
}

export const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case LOGIN_FAIL:
      return {
        ...state,
        loginError: action.payload
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginError: '',
        me: action.payload
      }

    default:
      // eslint-disable-next-line 
      const x: never = action;
      return state
  }
}


export type CustomerReducer = ReturnType<typeof reducer>