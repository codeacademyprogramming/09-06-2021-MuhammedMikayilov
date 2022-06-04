import { Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { getSongs } from "../../redux/actions/songAction";
import Sidebar from "../../Sidebar";
import SongList from "./SongList";

function Songs() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getSongs()(dispatch);
  }, [dispatch]);
  return (
    <>
      <Sidebar />
      <div className="content">
        <Typography variant="h3" align="center">
          Songs
        </Typography>
        <SongList />
      </div>
    </>
  );
}

export default Songs;
