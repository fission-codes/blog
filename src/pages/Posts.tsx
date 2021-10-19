import React, { useState, FunctionComponent } from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Feed } from "../utils/feed";

type PostProps = {
  feed: Feed
}

const Posts: FunctionComponent<PostProps> = ({ feed }) => {
  console.log('in posts', feed)

  return (
    <Layout>
      <header className="flex">
        <h1 className="text-xl flex-grow">Posts</h1>
        <Link to="/posts/new" className="justify-end new">
          + New
        </Link>
      </header>

      <section className="w-full py-8 table post-list">
        <ol className="table-row-group m-2">
          <li className="table-row bg-base-25">
            <div className="table-cell py-2 px-4 uppercase text-xs">Title</div>
            <div className="table-cell py-2 px-4 uppercase text-xs">Status</div>
            <div className="table-cell py-2 px-4 uppercase text-xs">
              Last Update
            </div>
          </li>

          {feed?.items.map((item, i) => {
            console.log('*item*', item)

            return (<li key={i} className="table-row bg-white">
                <div className="table-cell img-cell">
                  {item.image ?
                    <img src={item.image} /> :
                    null
                  }
                </div>
                <div className="table-cell py-2 px-4">{item.title}</div>
                <div className="table-cell py-2 px-4">Draft</div>
                <div className="table-cell py-2 px-4">{item.date_published}</div>
              </li>)
            })
          }
        </ol>
      </section>
    </Layout>
  );
};

export default Posts;
