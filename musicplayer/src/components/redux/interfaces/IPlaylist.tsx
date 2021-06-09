// import { ISongsPayload } from "./songs";

export interface ISongs {
  name: string;
  artist: string;
  uploadDate: string;
  mediaUrl: string;
  playlistId: string;
}

export interface IPlaylist {
  _id: string;
  name: string;
  creationDate: string;
  author: string;
  songs?: ISongs[];
}
