import React from "react";
import { useWebnative } from "./context/webnative";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const { state } = useWebnative();

  return state?.authenticated ? <Home /> : <Login />;
}

export default App;
