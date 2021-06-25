import { combineReducers } from "redux"

import { reducer as customer } from '../../bus/Customer/redux/reducer';

export const rootReducer = combineReducers({
  customer
})


export type IStore = ReturnType<typeof rootReducer>