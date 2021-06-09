import mongoose from "mongoose";
const { Schema } = mongoose;

const addSongsToPlaylist = new Schema({
  name: {
    type: String,
  },
});
export default mongoose.model("AddSongs", addSongsToPlaylist);
