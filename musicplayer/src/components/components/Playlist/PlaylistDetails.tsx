import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPlaylistById } from "../../redux/actions/playlistAction";
import PlaylistDetailTable from "./PlaylistDetailTable";
import { IPlaylistForState } from "./Playlists";

interface ParamTypes {
  id: string;
}
interface IPlaylistIdState {
  playlist: { playlistId: IPlaylistForState };
}
function PlaylistDetails() {
  const { playlistId } = useSelector(
    (state: IPlaylistIdState) => state.playlist!
  );

  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  console.log("id:", id);

  React.useEffect(() => {
    getPlaylistById(id)(dispatch);
  }, [dispatch, id]);
  return (
    <div className="content">
      <Box width="1024px" margin="0 auto">
        <Box marginY={5} textAlign="center">
          <Typography variant="h3">{playlistId?.name}</Typography>
          <Box marginY={2}>
            <Typography variant="body2">
              <b>Author</b>: {playlistId?.author}
            </Typography>
          </Box>
          <Divider />
        </Box>
        <Box textAlign="center">
          <Typography variant="h6">Songs</Typography>
          <PlaylistDetailTable songs={playlistId?.songs} />
        </Box>
      </Box>
    </div>
  );
}

export default PlaylistDetails;
