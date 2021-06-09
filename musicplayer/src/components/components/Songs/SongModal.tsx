import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import swal from "sweetalert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongToPlaylist,
  getPlaylist,
} from "../../redux/actions/playlistAction";
import { IPlaylistState } from "../Playlist/Playlists";
import { ISongsForState } from "./SongList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface IProps {
  handleClose: () => void;
  open: boolean;
  song: ISongsForState;
}

const SongModal: React.FC<IProps> = ({ handleClose, open, song }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const [plId, setPLId] = React.useState("");

  const { playlist } = useSelector((state: IPlaylistState) => state.playlist!);

  const handleChange = React.useCallback((item) => {
    setPLId(item);
  }, []);

  const handleAgree = React.useCallback(
    (id) => {
      console.log("music", song);

      addSongToPlaylist(plId, song)(dispatch);
      swal("Success!", "Added!", "success");
      handleClose();
    },
    [dispatch, handleClose, plId, song]
  );

  React.useEffect(() => {
    getPlaylist()(dispatch);
  }, [dispatch]);
  return (
    <div style={{ display: "inline-block" }}>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add to playlist"}
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Playlist</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => handleChange(e.target.value)}
            >
              {playlist?.map((list) => (
                <MenuItem value={list._id}>{list.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SongModal;
