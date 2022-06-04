import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { ISongsForState } from "./SongList";
import { createSong } from "../../redux/actions/songAction";
export interface IPlaylistForState {
  _id?: string;
  name: string;
  creationDate: string;
  author: string;
  songs: [];
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

function FormSongs() {
  const formData = new FormData();
  const [open, setOpen] = React.useState(false);
  const [inputVal, setInputVal] = React.useState<ISongsForState>({
    name: "",
    artist: "",
    uploadDate: "",
    mediaUrl: "",
  });

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = React.useCallback(() => {
    formData.append("name", inputVal.name);
    formData.append("artist", inputVal.artist);
    formData.append("uploadDate", inputVal.uploadDate);
    createSong(formData)(dispatch);
    swal("Success!", "Added!", "success");
    handleClose();
  }, [formData, dispatch, inputVal.name, inputVal.artist, inputVal.uploadDate]);

  const [selectedDate] = React.useState(
    new Date("2014-08-18T21:11:54").toString()
  );

  const handleChange = React.useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputVal({ ...inputVal, [name]: value });
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
          <DialogContentText>Add new Song</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Song name"
            type="text"
            name="name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Artist name"
            type="text"
            name="artist"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id="date"
            type="date"
            defaultValue={selectedDate}
            fullWidth
            name="uploadDate"
            onChange={handleChange}
          />
          <TextField
            id="file"
            type="file"
            fullWidth
            name="mediaUrl"
            onChange={(e: any) => {
              formData.append("music", e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormSongs;
