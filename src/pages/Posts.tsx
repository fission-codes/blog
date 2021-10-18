import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Feed, Item } from "../utils/feed";
import React, { FunctionComponent } from 'react';
// import { RouteComponentProps } from "react-router-dom";
import * as wn from "webnative";
import { useWebnative } from "../context/webnative";


type PostProps = {
  feed: Feed
}

function getImg (wn, feedItem: Item) {
  const { fs } = wn
  var fileName = feedItem.image
  return fs.cat(wn.path.file(fileName))
}

// > we encourage using IPFS hashes as the canonical representation for data
// where do you get the ipfs hash?

// need to read the images from wn.fs and do url.create
// before you put the src in the img tag

// const Posts: FunctionComponent<PostProps & RouteComponentProps<any>> = ({ feed }) => {
// const Posts: FunctionComponent<RouteComponentProps<PostProps>> = ({ feed }) => {
const Posts: FunctionComponent<PostProps> = ({ feed }) => {
  console.log('in posts', feed)
  const wn = useWebnative()

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

            getImg(wn, item)
              .then((res:string) => console.log('aaaa', res))

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
