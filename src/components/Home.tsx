import React from "react";
import { useWebnative } from "../context/webnative";

const Home = () => {
  const { logout } = useWebnative();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-base-300 break-all left-0 p-4 right-0 sticky flex">
        <h1 className="text-2xl flex-auto">Blog</h1>
        <button onClick={() => logout()}>Logout</button>
      </header>
      <main className="flex flex-auto"></main>
    </div>
  );
};

export default Home;
