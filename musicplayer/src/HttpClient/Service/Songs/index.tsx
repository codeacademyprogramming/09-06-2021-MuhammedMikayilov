import { HttpClient } from "../../HttpClient";

class SongsService extends HttpClient {
  constructor() {
    super("http://localhost:8000");
  }

  getSongs() {
    return this.get("songs");
  }

  postSongs(body: FormData) {
    return this.post("songs", body);
  }

  deleteSong(id: string) {
    return this.delete("songs", id);
  }
}
export const songService = new SongsService();
