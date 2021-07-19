import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useWebnative } from "../context/webnative";
import * as wn from "webnative";
import { FilePath } from "webnative/dist/path";
import { Feed } from "../utils/feed";

const Posts = () => {
  const { fs, username } = useWebnative();
  const [feed, setFeed] = useState<Feed | null>();

  // Load or initialize feed
  useEffect(() => {
    async function loadFeed() {
      if (!username || !fs || !fs.appPath) return;

      const feedPath = fs.appPath(wn.path.file("feed.json"));
      if (await fs.exists(feedPath)) {
        console.log("✅ feed file exists");
        const content = await fs.read(feedPath as FilePath);
        setFeed(Feed.fromString(content as string));
      } else {
        console.log("❌ need to create feed");
        const newFeed = new Feed(`${username}'s blog`);
        await fs.write(feedPath as FilePath, newFeed.toString());
        await fs.publish();
      }
    }

    loadFeed();
  }, [fs, username]);

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
            <div className="table-cell py-2 px-4 uppercase text-xs">Title</div>
            <div className="table-cell py-2 px-4 uppercase text-xs">Status</div>
            <div className="table-cell py-2 px-4 uppercase text-xs">
              Last Update
            </div>
          </li>
          {feed?.items.map((item) => (
            <li className="table-row bg-white">
              <div className="table-cell py-2 px-4">{item.title}</div>
              <div className="table-cell py-2 px-4">Draft</div>
              <div className="table-cell py-2 px-4">{item.date_published}</div>
            </li>
          ))}
        </ol>
      </section>
    </Layout>
  );
};

export default Posts;
