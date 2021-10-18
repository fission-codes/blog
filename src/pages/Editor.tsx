import React, {
  BaseSyntheticEvent,
  FunctionComponent,
  useState
} from 'react';
// import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { useWebnative } from "../context/webnative";
import * as wn from "webnative";
import { FilePath } from "webnative/path";
import { Feed } from "../utils/feed";

// type Inputs = {
//   title: string;
//   content: string;
//   image: string;
// };

type EditorProps = {
  feed: Feed
}

const Editor: FunctionComponent<EditorProps> = ({ feed }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>();

  const _wn = useWebnative()
  const { fs } = _wn

  const [previewImage, setPreviewImage] = useState<string | null>(null);



  // ???
  // Argument of type 'string' is not assignable to parameter of type 'Blob'.
  // this typescript error is only when using the react-hook-form dependency,
  // not with a standard event handler function

  // const onSubmit = handleSubmit(async (data) => {
  //   if (!fs || !fs.appPath) return

  //   console.log('**on submit**', data)

    // data.image is a `FileList` object
    // const imageFile = data.image[0]
    // console.log('**image', imageFile)

    // why does this give a ts error?
    // -----------------------------------------------------
    // const reader = new FileReader()

    // reader.onloadend = () => {
    //   console.log('reader.result', reader.result)
    // }

    // ???
    // Argument of type 'string' is not assignable to parameter of type 'Blob'.
    // reader.readAsDataURL(imageFile)
    // -----------------------------------------------------


    // feed.addItem({
    //   // TODO -- how to get id?
    //   // could take the hash of the post (without id attribute), then
    //   //   add `id: <hash>`
    //   id: '1',
    //   content_text: data.content,
    //   title: data.title
    // })

    // const feedPath = fs.appPath(wn.path.file("feed.json"));
    // fs.write(feedPath as FilePath, feed.toString())
    //   // TODO -- should show resolving status while we publish
    //   .then(() => fs.publish())
  // });

  interface FeedData {
    title: string;
    content: string;
  }

  function updateFeed (data: FeedData, imgName: string) {
  // function updateFeed (data: FeedData, img: ArrayBuffer) {
    if (!fs || !fs.appPath) return

    // we could also take a blob/buffer for the image, and save the blob to
    // ipfs, then include just a link to the blob in the message item, then
    // save the message
    // doing it this way, where we embed a base64 URL into the message
    // is not ideal because you need to download *all the images* that are
    // in the feed. Whereas if a msg contains just a link, you would
    // load a feed, and then choose which images to display by modifying the
    // markup to include various <img> tags

    feed.addItem({
      // TODO -- how to get id?
      // could take the hash of the post (without id attribute), then
      //   add `id: <hash>`
      id: '1',

      // how can we record just an address for the image?
      // the image should be already written to disk when this is called
      image: imgName,

      content_text: data.content,
      title: data.title
    })

    const feedPath = fs.appPath(wn.path.file("feed.json"));
    return fs.write(feedPath as FilePath, feed.toString())
      // TODO -- should show resolving status while we publish
      .then(() => fs.publish())
  }


  // -----------------------------------------------------------------------

  function getNameFromFile (file:File) {
    const url = URL.createObjectURL(file);
    // blob:http://localhost:3000/83507733-bfb8-42dd-ac10-638e2c28c776
    var slug = url.split('/').pop()
    var ext = file.name.split('.').pop()
    var fileName = slug + '.' + ext
    return fileName
  }

  // const content = await fs.cat(wn.path.file("public", "some", "file"))

  const submitter = (ev: BaseSyntheticEvent) => {
    if (!(fs && fs.appPath)) return
    ev.preventDefault()
    console.log('ev.target.elements', ev.target.elements)
    const image:File = ev.target.elements.image.files[0]
    console.log('**image', image)

    var fileName = getNameFromFile(image)

    const data = ['title', 'content'].reduce((acc: any, k) => {
      acc[k] = ev.target.elements[k].value
      return acc
    }, {})

    // first save the image,
    // then update the feed and save the feed
    // (this is a two step process, not atomic)
    fs.write(fs.appPath(wn.path.file(fileName)), image)
      .then(() => updateFeed(data, fileName))

    // if we save a file to ipfs, what do we use as the URL in the
    // img tag source?

    // need to take the filename in the message, read it from wn.fs,
    // then do `createObjectURL` on the file object



    // const reader = new FileReader()
    // reader.onloadend = () => {
    //   console.log('load end')
    //   updateFeed(data, reader.result as string)
    //   // onSubmit(ev)
    //   // updateFeed(data, reader.result as ArrayBuffer)
    // }
    // reader.readAsDataURL(image)  // this gives us base64

    // const url = URL.createObjectURL(image);
    // console.log('url', url)

    // like filereader, but more direct
    // image.arrayBuffer()
    //   .then(buf => {
    //     console.log('*buf*', buf)
    //     updateFeed(data, buf)
    //   })
  }

  function changer (ev: BaseSyntheticEvent) {
    if (!(fs && fs.appPath)) return
    var image:File = ev.target.files[0]
    console.log('*img*', image)
    const url = URL.createObjectURL(image);
    console.log('*url*', url)
    setPreviewImage(url)

    // var slug = url.split('/').pop()
    // var ext = image.name.split('.').pop()

    // var fileName = slug + '.' + ext

    // fs.write(fs.appPath(wn.path.file(fileName)), image)

    // console.log(
    //   'path',
    //   fs.appPath(),
    //   slug,
    //   ext,
    //   'aaa'
    // )

    // image.arrayBuffer()
    //   .then(buf => {
    //     console.log('*buf*', buf)
    //     // fs.write(fs.appPath(wn.path.file(fileName)), buf)
    //   })
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
              name={'title'}
            />
          </label>

          {previewImage ?
            (<div className="preview-image">
              <img src={previewImage} />
            </div>) :
            null
          }

          <label className="block mt-6">
            Image
            <input type="file"
              onChange={changer}
              className="form-input"
              name={'image'}
            />
          </label>

          <label className="block mt-6">
            Body
            <textarea
              rows={20}
              className="form-textarea"
              required={true}
              name={'content'}
            ></textarea>
          </label>
          <div>
            <button className="btn publish-btn">Publish</button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Editor;
