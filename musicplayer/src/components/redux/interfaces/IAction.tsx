import { ACTION_TYPES } from "../actions/actionTypes";
import { IPlaylist } from "./IPlaylist";

export interface IAction {
  type: ACTION_TYPES;
  payload: IPlaylist;
}
