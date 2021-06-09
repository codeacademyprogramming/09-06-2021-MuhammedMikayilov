import express, { Request, Response } from "express";
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const multer = require("multer"); //use multer to upload blob data
const uuid = require("uuid").v4;
const url = require("native-url");
import { ISongsPayload, IPlaylistPayload } from "./interfaces/index";
import { IRegisterPayload, ILoginPayload } from "./interfaces/users";
import { Songs, Playlist, Auth } from "./modules";
import { comparePassword, requiredAuth } from "./helpers/index";
import jwt from "jsonwebtoken";
import * as yup from "yup";
const path = require("path");
app.use(cors());

const uri =
  "mongodb+srv://MuhammedMikayilov:MuhammedMikayilov@cluster0.27jgn.mongodb.net/PlaylistApp?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("success"))
  .catch((err: any) => console.log("err", err));

const storage = multer.diskStorage({
  destination: (req: Request, file: File, cb: Function) => {
    cb(null, "musics");
  },
  filename: (req: Request, file: File, cb: Function) => {
    const { originalname }: any = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});
const upload = multer({ storage });

const PORT = "8000";
app.use(express.static("musics"));
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

// User routes
let registeredSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().required(),
});
let loginSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required(),
});

app.post("/auth/register", async (req: Request, res: Response) => {
  const registerPayload: IRegisterPayload = {
    ...req.body,
  };

  try {
    const isPayloadValid = await registeredSchema.validate(registerPayload);
    const user = new Auth(isPayloadValid);
    const newUser = await user.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      role: newUser.role,
      createdDate: newUser.createdDate,
    });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

app.post("/auth/login", async (req: Request, res: Response) => {
  const loginPayload: ILoginPayload = {
    ...req.body,
  };

  try {
    const isPayloadValid = await loginSchema.validate(loginPayload);
    const user = await Auth.findOne({ email: isPayloadValid.email }).select(
      "+password"
    );

    if (!user) {
      res.status(422).json({ errors: ["User not exist"] });
    } else {
      if (!comparePassword(loginPayload.password, user.password)) {
        return res.status(422).json({ message: "Emial or password is wrong" });
      } else {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          "loginmymusicapp",
          { expiresIn: "1h" }
        );
        res.status(200).json({ token });
      }
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

// Playlist routes
app.get("/playList", async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.find();
    res.status(200).json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/playlist/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findById(id);

    if (!playlist) {
      res.json({ message: "Not Found" });
    } else {
      res.status(200).json(playlist);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/playList", async (req: Request, res: Response) => {
  const playlistPayload: IPlaylistPayload = {
    ...req.body,
  };
  const playlist = new Playlist(playlistPayload);
  try {
    const newPlaylist = await playlist.save();
    res.status(200).json(newPlaylist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/playlist/:id/addsong", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let playlist = await Playlist.findById(id);
    if (!playlist) {
      res.status(404).json({ message: "Not found" });
    } else {
      const playList: IPlaylistPayload = req.body;

      await Playlist.updateOne(
        { _id: id },
        {
          $push: { songs: playList },
        }
      );

      playlist = await Playlist.findById(id);
      res.json(playlist);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/playlist/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  let playlist = Playlist.findById(id);
  if (!playlist) {
    res.status(404).json({ message: "Playlist is not found" });
  } else {
    await Playlist.findByIdAndUpdate(id, req.body, {
      useFindAndModify: true,
    });
    playlist = await Playlist.findById(id);
    res.status(200).json(playlist);
  }
});

app.delete("/playlist/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let playlist = Playlist.findById(id);
    if (!playlist) {
      res.status(404).json({ message: "Playlist is not found" });
    } else {
      await playlist.remove();
      res.json({ message: "Deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Some server error" });
  }
});

app.get(
  "/songs",
  upload.single("music"),
  async (req: Request, res: Response) => {
    try {
      const songs = await Songs.find();
      res.status(200).json(songs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

app.get("/songs/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const songs = await Songs.findById(id);
    if (!songs) {
      res.json({ message: "Not Found" });
    } else {
      res.status(200).json(songs);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

interface MulterRequest extends Request {
  file: any;
}

app.post(
  "/songs",
  upload.single("music"),
  async (req: Request, res: Response) => {
    const documentFile = (req as MulterRequest).file;

    const songsPayload: ISongsPayload = {
      ...req.body,
      mediaUrl: url.resolve(
        "http://localhost:8000/",
        `${documentFile.filename}`
      ),
    };

    const songs = new Songs(songsPayload);
    try {
      const newSongs = await songs.save();

      res.status(200).json({
        name: newSongs.name,
        artist: newSongs.artist,
        uploadDate: newSongs.uploadDate,
        mediaUrl: url.resolve(
          "http://localhost:8000/",
          `${documentFile.filename}`
        ),
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

app.put("/songs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  let songs = Songs.findById(id);
  if (!songs) {
    res.status(404).json({ message: "Songs is not found" });
  } else {
    await Songs.findByIdAndUpdate(id, req.body, {
      useFindAndModify: true,
    });
    songs = await Songs.findById(id);
    res.status(200).json(songs);
  }
});

app.delete("/songs/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let songs = Songs.findById(id);
    if (!songs) {
      res.status(404).json({ message: "Songs is not found" });
    } else {
      await songs.remove();
      res.json({ message: "Deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Some server error" });
  }
});

app.listen(PORT, () => {
  console.log("server is started");
});
