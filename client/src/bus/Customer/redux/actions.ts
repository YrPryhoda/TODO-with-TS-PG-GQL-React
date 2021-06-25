import { Customer } from "../../../generated/graphql";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";


export type LoginFailed = {
  type: typeof LOGIN_FAIL,
  payload: string
};

export type LoginSuccess = {
  type: typeof LOGIN_SUCCESS,
  payload: Customer
};


export const loginFailed = (message: string): LoginFailed => ({
  type: LOGIN_FAIL,
  payload: message
})

export const loginSuccess = (me: Customer): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload: me
})
