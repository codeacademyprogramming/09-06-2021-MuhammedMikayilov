import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box, Button } from "@material-ui/core";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InfoIcon from "@material-ui/icons/Info";
import FormPlaylist from "./FormPlaylist";
import { deletePlaylist } from "../../redux/actions/playlistAction";
import { useHistory } from "react-router";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

export interface IPlaylistForState {
  _id?: string;
  name: string;
  creationDate: string;
  author: string;
  songs: [];
}
export interface IPlaylistState {
  playlist?: { playlist?: IPlaylistForState[] };
}
const Playlists = () => {
  const { playlist } = useSelector((state: IPlaylistState) => state.playlist!);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleRemove = React.useCallback(
    (item) => {
      deletePlaylist(item._id)(dispatch);
    },
    [dispatch]
  );

  return (
    <Box width="1024px" margin="0 auto" marginTop={5}>
      <Box marginY={3}>
        <FormPlaylist />
      </Box>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Creation Date</StyledTableCell>
              <StyledTableCell>Songs count</StyledTableCell>
              <StyledTableCell>Detail</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlist?.map((list, idx) => (
              <TableRow key={list._id}>
                <StyledTableCell component="th" scope="row">
                  {idx + 1}
                </StyledTableCell>
                <StyledTableCell> {list.name}</StyledTableCell>
                <StyledTableCell> {list.creationDate}</StyledTableCell>
                <StyledTableCell> {list.songs?.length}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    style={{ color: "#008c3a" }}
                    onClick={() => push(`/playlist/${list._id}`)}
                  >
                    <InfoIcon />
                  </Button>
                  <Button color="primary">
                    <EditIcon />
                  </Button>
                  <Button color="secondary" onClick={() => handleRemove(list)}>
                    <DeleteForeverIcon />
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Playlists;
