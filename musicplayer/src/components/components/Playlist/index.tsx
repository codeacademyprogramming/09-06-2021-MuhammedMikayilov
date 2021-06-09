import { Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { getPlaylist } from "../../redux/actions/playlistAction";
import Sidebar from "../../Sidebar";
import Playlists from "./Playlists";

function Playlist() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    getPlaylist()(dispatch);
  }, [dispatch]);
  return (
    <>
      <Sidebar />
      <div className="content">
        <Typography variant="h3" align="center">
          Playlist
        </Typography>
        <Playlists />
      </div>
    </>
  );
}

export default Playlist;
