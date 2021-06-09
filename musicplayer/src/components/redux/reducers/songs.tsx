import { ACTION_TYPES } from "../actions/actionTypes";
import { IAction } from "../interfaces/IAction";
import { ISongs } from "../interfaces/IPlaylist";

export const reducerSongs = (state: ISongs[] = [], action: IAction) => {
  switch (action.type) {
    case ACTION_TYPES.GET_SONGS:
      return { ...state, songs: action.payload };
    case ACTION_TYPES.CREATE_SONGS:
      return {
        ...state,
        songs: [action.payload],
      };
    case ACTION_TYPES.DELETE_SONGS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
