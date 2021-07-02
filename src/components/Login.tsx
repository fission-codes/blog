import React from "react";
import { useWebnative } from "../context/webnative";

const Login = () => {
  const { login } = useWebnative();

  return <button onClick={() => login()}>Login</button>;
};

export default Login;
