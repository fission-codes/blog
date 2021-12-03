import React, { BaseSyntheticEvent, FunctionComponent, useState } from "react"
import Layout from "../components/Layout"
import { useWebnative } from "../context/webnative"
import * as wn from "webnative"
import { FilePath } from "webnative/path"
import { Feed } from "../utils/feed"

type EditorProps = {
  feed: Feed
}

const Editor: FunctionComponent<EditorProps> = ({ feed }) => {
  const { fs } = useWebnative()

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  interface FeedData {
    title: string
    content: string
  }

  function updateFeed(data: FeedData, imgName: string) {
    if (!fs || !fs.appPath) return

    feed.addItem({
      // TODO -- how to get id?
      // could take the hash of the post (without id attribute), then
      //   add `id: <hash>`
      id: "1",
      image: imgName,
      content_text: data.content,
      title: data.title,
    })

    const feedPath = fs.appPath(wn.path.file("feed.json"))
    return (
      fs
        .write(feedPath as FilePath, feed.toString())
        // TODO -- should show resolving status while we publish
        .then(() => fs.publish())
    )
  }

  // -----------------------------------------------------------------------

  function getNameFromFile(file: File) {
    const url = URL.createObjectURL(file)
    // blob:http://localhost:3000/83507733-bfb8-42dd-ac10-638e2c28c776
    const slug = url.split("/").pop()
    const ext = file.name.split(".").pop()
    return slug + "." + ext
  }

  const submitter = (ev: BaseSyntheticEvent) => {
    if (!(fs && fs.appPath)) return
    ev.preventDefault()
    const image: File = ev.target.elements.image.files[0]
    console.log("**image", image)

    const data = ["title", "content"].reduce((acc: any, k) => {
      acc[k] = ev.target.elements[k].value
      return acc
    }, {})

    const fileName = getNameFromFile(image)
    const url = URL.createObjectURL(image)
    console.log("*url*", url)

    // first save the image,
    // then update the feed and save the feed
    // (this is a two step process, not atomic)
    fs.write(fs.appPath(wn.path.file(fileName)), image).then(() =>
      updateFeed(data, fileName)
    )
  }

  function changer(ev: BaseSyntheticEvent) {
    const image: File = ev.target.files[0]
    console.log("*img*", image)
    const url = URL.createObjectURL(image)
    console.log("*url*", url)
    setPreviewImage(url)
  }

  // -----------------------------------------------------------------------

  return (
    <Layout>
      <header className="flex">
        <h1 className="text-xl flex-grow">New Post</h1>
      </header>
      <section className="w-full py-8">
        <form onSubmit={submitter}>
          <label className="block">
            Title
            <input
              type="text"
              className="form-input"
              required={true}
              name={"title"}
            />
          </label>

          {previewImage ? (
            <div className="preview-image">
              <img src={previewImage} />
            </div>
          ) : null}

          <label className="block mt-6">
            Image
            <input
              type="file"
              onChange={changer}
              className="form-input"
              name={"image"}
            />
          </label>

          <label className="block mt-6">
            Body
            <textarea
              rows={20}
              className="form-textarea"
              required={true}
              name={"content"}
            ></textarea>
          </label>
          <div>
            <button className="btn">Publish</button>
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default Editor
