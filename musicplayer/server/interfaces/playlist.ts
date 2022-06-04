import { ISongsPayload } from "./songs";
export interface IPlaylistPayload {
  name: string;
  creationDate: string;
  author: string;
  songs?: ISongsPayload[];
}
