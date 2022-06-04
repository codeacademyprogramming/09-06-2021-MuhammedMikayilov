import { playlistService } from "../../../HttpClient/Service/Playlists";
import { IPlaylistForState } from "../../components/Playlist/Playlists";
import { ISongsForState } from "../../components/Songs/SongList";
import { ACTION_TYPES } from "./actionTypes";

export const getPlaylist = () => (dispatch: Function) => {
  playlistService.getPlaylist().then(({ data }) => {
    console.log("data", data);
    dispatch({
      type: ACTION_TYPES.GET_PLAYLIST,
      payload: data,
    });
  });
};

export const getPlaylistById = (id: string) => (dispatch: Function) => {
  playlistService.getPlaylistById(id).then(({ data }) => {
    dispatch({
      type: ACTION_TYPES.GET_PLAYLIST_ID,
      payload: data,
    });
  });
};

export const addSongToPlaylist =
  (id: string, data: ISongsForState) => (dispatch: Function) => {
    playlistService.addSongToPlaylist(id, data).then(({ data }) => {
      dispatch({
        type: ACTION_TYPES.CREATE_SONGS_PLAYLIST,
        payload: { playlist: { playlist: [{ data }] } },
      });
    });
  };

export const addPlaylist =
  (data: IPlaylistForState) => (dispatch: Function) => {
    playlistService
      .postPlaylist(data)
      .then(({ data }) => {
        dispatch({
          type: ACTION_TYPES.CREATE_PLAYLIST,
          payload: { playlist: { playlist: [{ data }] } },
        });
      })
      .then(() => {
        dispatch(getPlaylist());
      });
  };

export const deletePlaylist = (id: string) => (dispatch: Function) => {
  playlistService
    .deletePlaylist(id)
    .then(({ data }) =>
      dispatch({
        type: ACTION_TYPES.DELETE_PLAYLIST,
        payload: data,
      })
    )
    .then(() => dispatch(getPlaylist()));
};
