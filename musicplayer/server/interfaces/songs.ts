export interface ISongsPayload {
  name: string;
  artist: string;
  uploadDate: string;
  mediaUrl: string;
  playlistId: string;
  music: File;
  _id?: string;
}
