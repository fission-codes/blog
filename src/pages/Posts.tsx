import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Posts = () => {
  return (
    <Layout>
      <header className="flex">
        <h1 className="text-xl flex-grow">Posts</h1>
        <Link to="" className="justify-end">
          + New
        </Link>
      </header>
      <section className="w-full py-8 table">
        <ol className="table-row-group m-2">
          <li className="table-row bg-base-25">
            <div className="table-cell p-2 uppercase text-xs">Title</div>
            <div className="table-cell p-2 uppercase text-xs">Status</div>
            <div className="table-cell p-2 uppercase text-xs">Last Update</div>
          </li>
          <li className="table-row bg-white">
            <div className="table-cell p-2">First Post!</div>
            <div className="table-cell p-2">Draft</div>
            <div className="table-cell p-2">2 days ago</div>
          </li>
        </ol>
      </section>
    </Layout>
  );
};

export default Posts;
