import { AuthenticationError } from "apollo-server-express";
import { CustomersRepository } from "./customers.repository";
import { setToken } from "../../helpers/setToken";
import { removeToken } from "../../helpers/removeToken";

export class CustomersController {
  constructor() {
    this.repository = () => new CustomersRepository();
  }

  me = async (_, vars, context) => {
    try {
      const id = context.req.userId;

      if (!id) {
        throw new Error('You do not login')
      }

      const user = await this.repository().findByField({ id })

      return user;
    } catch (error) {
      throw new AuthenticationError(error.message);
    }
  }

  signUp = async (_, { customer }, context) => {
    try {
      const { firstName, lastName, email, password } = customer;

      if (!firstName || !lastName || !email || !password) {
        throw new Error('Not all fields were filled!');
      }

      const user = await this.repository().signUp(customer)

      return user;
    } catch (error) {
      throw new AuthenticationError(error.message);
    }
  };

  login = async (_, { email, password }, context) => {
    try {
      const candidate = await this.repository().findByField({ email });

      if (!candidate || candidate.password !== password) {
        throw new Error();
      };

      setToken(context.req, candidate.id);
      return candidate;
    } catch (error) {
      throw new AuthenticationError('Sorry, wrong credentials');
    }
  };

  logout = async (_, vars, { req, res }) => {
    try {
      const id = req.userId;
      if (!id) {
        throw Error()
      }
      const user = await this.repository().findByField({ id })

      removeToken(req);
      return user;
    } catch (error) {
      throw new AuthenticationError('You do not login!')
    }
  }

  customers = async (_, vars, context) => {
    try {
      const users = await this.repository().findAll();

      return users;
    } catch (error) {
      console.log(error);
    }
  };

  updateCustomer = async (_, { customer }, context) => {
    try {
      const id = context.req.userId;
      await this.repository().updateOne(id, customer);
      const user = await this.repository().findByField({ id });

      return user
    } catch (error) {
      throw new AuthenticationError('You do not login!')
    }
  }
}
