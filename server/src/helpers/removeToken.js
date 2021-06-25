import { tokenName } from "../init/consts"

export const removeToken = (req) => {
  req.session[tokenName] = null;
  req.userId = null;
}