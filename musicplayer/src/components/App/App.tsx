import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Playlist from "../components/Playlist";
import PlaylistDetails from "../components/Playlist/PlaylistDetails";
import Songs from "../components/Songs";
import Sidebar from "../Sidebar";
import "./style.scss";
function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/playlist" exact component={Playlist} />
        <Route path="/songs" exact component={Songs} />
        <Route path="/playlist/:id" exact component={PlaylistDetails} />
        <Redirect to="/playlist" exact />
      </Switch>
    </Router>
  );
}

export default App;
