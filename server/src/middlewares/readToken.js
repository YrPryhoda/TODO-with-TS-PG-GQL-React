import jwt from 'jsonwebtoken';
import { sessionSecret, tokenName } from '../init/consts';


export const readToken = (req, res, next) => {
  const token = req.session[tokenName];
  if (token) {
    const isValid = jwt.verify(token, sessionSecret);
    if (isValid) {
      req.userId = isValid.userId;
    }
  }

  next();
}