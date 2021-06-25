import { CustomersController } from '../customers.controller';

const { customers, me } = new CustomersController();


export const queries = {
  me,
  customers
}