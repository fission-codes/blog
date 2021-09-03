import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Posts from "./pages/Posts";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/posts" exact />
        <AuthRoute path="/posts" component={Posts} exact />
        <AuthRoute path="/posts/new" component={Editor} exact />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
