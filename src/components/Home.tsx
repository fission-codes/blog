import React from "react";
import { useWebnative } from "../context/webnative";

const Home = () => {
  const { logout } = useWebnative();

  return (
    <main>
      <h1>Fission Blog</h1>

      <button onClick={() => logout()}>Logout</button>
    </main>
  );
};

export default Home;
