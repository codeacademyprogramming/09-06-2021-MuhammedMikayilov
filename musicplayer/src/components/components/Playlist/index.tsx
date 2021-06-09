import { Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { getPlaylist } from "../../redux/actions/playlistAction";
import Playlists from "./Playlists";

function Playlist() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    getPlaylist()(dispatch);
  }, [dispatch]);
  return (
    <div className="content">
      <Typography variant="h3" align="center">
        Playlist
      </Typography>
      <Playlists />
    </div>
  );
}

export default Playlist;
