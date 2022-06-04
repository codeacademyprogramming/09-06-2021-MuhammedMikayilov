import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box, Button } from "@material-ui/core";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";
import SongModal from "../Songs/SongModal";

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

interface ISongs {
  name: string;
  artist: string;
  uploadDate: string;
  mediaUrl: string;
}
interface IProps {
  songs: ISongs[];
}

const PlaylistDetailTable: React.FC<IProps> = ({ songs }) => {
  const [open, setOpen] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [, setPlayer] = React.useState("");
  const [soundfile, setSoundFile] = React.useState();

  const [video, setVideo] = React.useState(false);
  const [, setUrl] = React.useState("");

  const handlePlay = React.useCallback(
    (song) => {
      setUrl(song.mediaUrl);
      setPlayer(song.name);
      setPlay(true);
      setSoundFile(song.mediaUrl);
      video ? setVideo(false) : setVideo(true);
    },
    [video]
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
      <Box marginLeft={70}>
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

      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Artist</StyledTableCell>
              <StyledTableCell>Upload Date</StyledTableCell>
              <StyledTableCell>Detail</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs?.map((song, idx) => (
              <TableRow>
                <StyledTableCell component="th" scope="row">
                  {idx + 1}
                </StyledTableCell>
                <StyledTableCell> {song?.name}</StyledTableCell>
                <StyledTableCell> {song?.artist}</StyledTableCell>
                <StyledTableCell> {song?.uploadDate}</StyledTableCell>
                <StyledTableCell>
                  <SongModal
                    handleClose={handleClose}
                    open={open}
                    song={song}
                  />
                  <Button color="primary" onClick={() => handlePlay(song)}>
                    <PlayCircleFilledIcon />
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

export default PlaylistDetailTable;
