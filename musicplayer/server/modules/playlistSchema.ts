import mongoose from "mongoose";
const { Schema } = mongoose;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  songs: {
    type: Array,
  },
});
export default mongoose.model("Playlist", playlistSchema);
