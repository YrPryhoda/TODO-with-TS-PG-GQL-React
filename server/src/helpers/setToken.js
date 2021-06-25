import jwt from 'jsonwebtoken';
import { sessionSecret, tokenName } from '../init/consts';

export const setToken = (req, userId) => {
  const token = jwt.sign({ userId }, sessionSecret);
  req.session[tokenName] = token;

  return true
}