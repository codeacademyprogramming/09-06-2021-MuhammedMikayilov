import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box, Button, Grid } from "@material-ui/core";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import StopIcon from "@material-ui/icons/Stop";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormSongs from "./FormSongs";
import SongModal from "./SongModal";
import { removeSong } from "../../redux/actions/songAction";

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

export interface ISongsForState {
  name: string;
  artist: string;
  uploadDate: string;
  mediaUrl: string;
  playlistId?: string;
}

export interface ISongsState {
  songs: { songs: ISongsForState[] };
}

interface IProps {}

const SongList: React.FC<IProps> = () => {
  const { songs } = useSelector((state: ISongsState) => state.songs!);
  const [open, setOpen] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [, setPlayer] = React.useState("");
  const [music, setMusic] = React.useState<ISongsForState>(Object);
  const [soundfile, setSoundFile] = React.useState();

  const dispatch = useDispatch();

  const handleClickOpen = (song: ISongsForState) => {
    setMusic(song);
    setOpen(true);
  };
  const [video, setVideo] = React.useState(false);
  const [, setUrl] = React.useState("");

  const handlePlay = React.useCallback(
    (song) => {
      setUrl(song.mediaUrl);
      setPlayer(song.name);
      setSoundFile(song.mediaUrl);
      setPlay(true);
      video ? setVideo(false) : setVideo(true);
    },
    [video]
  );

  const handleRemove = React.useCallback(
    (item) => {
      removeSong(item._id)(dispatch);
    },
    [dispatch]
  );
  const handleStop = React.useCallback(() => {
    setUrl("");
    setPlayer("");
    setPlay(false);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box width="1024px" margin="0 auto" marginTop={5}>
      <Grid container>
        <Grid item xs={6}>
          <Box marginY={4}>
            <FormSongs />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box marginTop={4} marginLeft={14}>
            {play && soundfile && (
              <>
                <audio src={soundfile} preload="metadata" autoPlay controls />
                <Box
                  display="inline-block"
                  marginLeft={5}
                  onClick={handleStop}
                  style={{
                    border: "1px solid red",
                    borderRadius: "30px",
                    lineHeight: "14px",
                  }}
                >
                  <StopIcon
                    style={{
                      width: "45px",
                      height: "39px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Artist</StyledTableCell>
              <StyledTableCell>Upload Date</StyledTableCell>
              {/* <StyledTableCell>Media Url</StyledTableCell> */}
              <StyledTableCell>Detail</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs?.map((song, idx) => (
              <TableRow key={song?.name}>
                <StyledTableCell component="th" scope="row">
                  {idx + 1}
                </StyledTableCell>
                <StyledTableCell> {song.name}</StyledTableCell>
                <StyledTableCell> {song.artist}</StyledTableCell>
                <StyledTableCell> {song.uploadDate}</StyledTableCell>
                {/* <StyledTableCell>{song.mediaUrl}</StyledTableCell> */}
                <StyledTableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClickOpen(song)}
                  >
                    <AddCircleOutlineIcon />
                  </Button>
                  {open && (
                    <SongModal
                      handleClose={handleClose}
                      open={open}
                      song={music}
                    />
                  )}

                  <Button color="primary" onClick={() => handlePlay(song)}>
                    <PlayCircleFilledIcon />
                  </Button>
                  <Button color="secondary" onClick={() => handleRemove(song)}>
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

export default SongList;
