import { CustomersController } from '../customers.controller';

const { signUp, login, logout, updateCustomer } = new CustomersController();

export const mutations = {
  signUp,
  login,
  logout,
  updateCustomer
}