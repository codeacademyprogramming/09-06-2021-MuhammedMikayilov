import { combineReducers } from "redux";
import { reducerPlaylist } from "./playlist";
import { reducerSongs } from "./songs";

const reducer = combineReducers({
  playlist: reducerPlaylist!,
  songs: reducerSongs!,
});

export default reducer;
