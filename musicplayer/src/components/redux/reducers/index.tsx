import { combineReducers } from "redux";
import { reducerPlaylist } from "./playlist";
import { reducerSongs } from "./songs";
import { reducerUser } from "./user";

const reducer = combineReducers({
  playlist: reducerPlaylist!,
  songs: reducerSongs!,
  users: reducerUser!,
});

export default reducer;
