import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute path="/" component={Home} exact />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
