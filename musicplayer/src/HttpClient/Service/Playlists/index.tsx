import { IPlaylistForState } from "../../../components/components/Playlist/Playlists";
import { ISongsForState } from "../../../components/components/Songs/SongList";
import { HttpClient } from "../../HttpClient";

class PlaylistService extends HttpClient {
  constructor() {
    super("http://localhost:8000");
  }

  getPlaylist() {
    return this.get("playlist");
  }

  getPlaylistById(id: string) {
    return this.getById("playlist", id);
  }

  postPlaylist(body: IPlaylistForState) {
    return this.post("playlist", body);
  }

  deletePlaylist(id: string) {
    return this.delete("playlist", id);
  }

  addSongToPlaylist(id: string, body: ISongsForState) {
    return this.post(`playlist/${id}/addsong`, body);
  }
}
export const playlistService = new PlaylistService();
