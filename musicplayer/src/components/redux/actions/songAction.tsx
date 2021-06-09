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

export const createSong = (data: FormData) => (dispatch: Function) => {
  songService
    .postSongs(data)
    .then(({ data }) => {
      dispatch({
        type: ACTION_TYPES.CREATE_SONGS,
        payload: { songs: { songs: [{ data }] } },
      });
    })
    .then(() => dispatch(getSongs()));
};

export const removeSong = (id: string) => (dispatch: Function) => {
  songService
    .deleteSong(id)
    .then(({ data }) =>
      dispatch({
        type: ACTION_TYPES.DELETE_SONGS,
        payload: data,
      })
    )
    .then(() => dispatch(getSongs()));
};
