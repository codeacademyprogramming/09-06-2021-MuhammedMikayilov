import { Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { getSongs } from "../../redux/actions/songAction";
import SongList from "./SongList";

function Songs() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getSongs()(dispatch);
  }, [dispatch]);
  return (
    <div className="content">
      <Typography variant="h3" align="center">
        Songs
      </Typography>
      <SongList />
    </div>
  );
}

export default Songs;
