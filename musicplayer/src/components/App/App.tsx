import React from "react";
import { useSelector } from "react-redux";
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

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

const ProtectedAuthUser = (props: any) => {
  const { children, ...rest } = props;
  const { users } = useSelector((state: any) => state.users);

  const localStr = localStorage.getItem("user_exist")!;
  const isUserExist = JSON.parse(localStr);
  return isUserExist ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/auth_error" />
  );
};

function App() {
  const { users } = useSelector((state: any) => state.users);

  const localStr = localStorage.getItem("user_exist")!;
  const isUserExist = JSON.parse(localStr);

  return (
    <Router>
      <Switch>
        <ProtectedAuthUser
          path="/playlist"
          exact
          isAuthenticated={isUserExist}
          component={Playlist}
        ></ProtectedAuthUser>
        <PrivateRoute
          path="/songs"
          exact
          component={Songs}
          isAuthenticated={isUserExist}
        />
        <PrivateRoute
          path="/playlist/:id"
          exact
          component={PlaylistDetails}
          isAuthenticated={isUserExist}
        />
        <PrivateRoute
          path="/login"
          exact
          component={Login}
          isAuthenticated={!isUserExist}
        />
        <PrivateRoute
          path="/signup"
          exact
          component={SignUp}
          isAuthenticated={!isUserExist}
        />
        <Redirect to="/login" exact />
      </Switch>
    </Router>
  );
}

export default App;
