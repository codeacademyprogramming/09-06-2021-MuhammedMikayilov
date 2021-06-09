import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  useLocation,
} from "react-router-dom";
import Login from "../Auth/Login";
import SignUp from "../Auth/Signup";
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
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Redirect to="/playlist" exact />
      </Switch>
    </Router>
  );
}

export default App;
