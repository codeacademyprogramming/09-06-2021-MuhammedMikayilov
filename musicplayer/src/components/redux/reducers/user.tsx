import { ACTION_TYPES } from "../actions/actionTypes";
import { IAction } from "../interfaces/IAction";

export const reducerUser = (state = [], action: IAction) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_USER:
      return { ...state, user: action.payload };
    case ACTION_TYPES.REGISTER_USER:
      return {
        ...state,
        user: [action.payload],
      };
    default:
      return state;
  }
};
