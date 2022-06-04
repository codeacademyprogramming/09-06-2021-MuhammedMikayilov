import mongoose from "mongoose";

const { Schema } = mongoose;

const songsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  playlistId: {
    type: String,
    // required: true,
  },
});

export default mongoose.model("Songs", songsSchema);
