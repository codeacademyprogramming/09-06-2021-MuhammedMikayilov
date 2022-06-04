import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addPlaylist } from "../../redux/actions/playlistAction";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { IPlaylistForState } from "./Playlists";
const FormPlaylist = () => {
  const [open, setOpen] = React.useState(false);
  const [inputVal, setInputVal] = React.useState<IPlaylistForState>({
    name: "",
    author: "",
    creationDate: "",
    songs: [],
  });

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = React.useCallback(
    (body) => {
      addPlaylist(inputVal)(dispatch);
      swal("Success!", "Added!", "success");
      handleClose();
    },
    [inputVal, dispatch]
  );

  const [selectedDate] = React.useState(
    new Date("2014-08-18T21:11:54").toString()
  );

  const handleChange = React.useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputVal({ ...inputVal, [name]: value });
      console.log(name, value);
    },
    [inputVal, setInputVal]
  );

  return (
    <div style={{ width: "30%" }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new Playlist</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Playlist name"
            type="text"
            name="name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Author name"
            type="text"
            name="author"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id="date"
            type="date"
            defaultValue={selectedDate}
            fullWidth
            name="creationDate"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormPlaylist;
