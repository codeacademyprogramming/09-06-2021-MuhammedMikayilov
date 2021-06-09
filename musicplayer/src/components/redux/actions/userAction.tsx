import { songService } from "../../../HttpClient/Service/Songs";
import { ACTION_TYPES } from "./actionTypes";

export const getSongs = () => (dispatch: Function) => {
  songService.getSongs().then(({ data }) => {
    console.log("data", data);
    dispatch({
      type: ACTION_TYPES.GET_SONGS,
      payload: data,
    });
  });
};
