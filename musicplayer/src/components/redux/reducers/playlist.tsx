import { ACTION_TYPES } from "../actions/actionTypes";
import { IAction } from "../interfaces/IAction";
import { IPlaylist } from "../interfaces/IPlaylist";

export const reducerPlaylist = (state: IPlaylist[] = [], action: IAction) => {
  switch (action.type) {
    case ACTION_TYPES.GET_PLAYLIST:
      return { ...state, playlist: action.payload };
    case ACTION_TYPES.GET_PLAYLIST_ID:
      return { ...state, playlistId: action.payload };
    case ACTION_TYPES.CREATE_SONGS_PLAYLIST:
      return { ...state };
    case ACTION_TYPES.CREATE_PLAYLIST:
      return {
        ...state,
        playlist: [action.payload],
      };
    case ACTION_TYPES.DELETE_PLAYLIST:
      return {
        ...state,
        playlist: [action.payload],
      };
    default:
      return state;
  }
};
