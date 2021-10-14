import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { useWebnative } from "../context/webnative";
import * as wn from "webnative";
import { FilePath } from "webnative/path";

type Inputs = {
  title: string;
  content: string;
  image: string;
};

const Editor = ({ feed }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const _wn = useWebnative()
  const { fs } = _wn

  console.log('wn', _wn)
  console.log('fs', fs)
  console.log('feed in editor', feed)

  const onSubmit = handleSubmit(async (data) => {
    console.log('**submit', data)

    if (!fs || !fs.appPath) return

    feed.addItem({
      // TODO -- how to get id?
      id: '1',
      authors: [{ name: 'alice' }],
      content_text: data.content,
      title: data.title,
      tags: ['b']
    })

    const feedPath = fs.appPath(wn.path.file("feed.json"));
    fs.write(feedPath as FilePath, feed.toString())
      // TODO -- should show resolving status while we publish
      .then(() => fs.publish())
  });

  return (
    <Layout>
      <header className="flex">
        <h1 className="text-xl flex-grow">New Post</h1>
      </header>
      <section className="w-full py-8">
        <form onSubmit={onSubmit}>
          <label className="block">
            Title
            <input
              type="text"
              className="form-input"
              {...register("title", { required: true })}
            />
          </label>

          <label className="block mt-6">
            Image
            <input type="file"
              className="form-input"
              {...register('image')}
            />
          </label>

          <label className="block mt-6">
            Body
            <textarea
              rows={20}
              className="form-textarea"
              {...register("content", { required: true })}
            ></textarea>
          </label>
          <div>
            <button className="btn">Publish</button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Editor;
