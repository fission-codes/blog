## learning about wn

The 'publish' button just console logs the input --
https://github.com/fission-suite/blog/blob/develop/src/pages/Editor.tsx#L18

Where would the input go in real life?

My guess is that you use the `webnative` module to `fs.write` the blog post
somewhere.

-----------------------------------------

Status -- working on 'publishing' blog posts -- just text, not images.

Need to call `fs.write` and/or `fs.publish`

Have moved the 'feed' object higher in the state tree -- https://github.com/nichoth/blog/blob/photo/src/App.tsx#L30 . That way it can be shared by multiple views. It is used by `Posts` and `Editor` so far.

An interesting thing is that the app will run alright, meaning `npm start` works. But in vscode typescript tells me there is an error in `/src/App.tsx`. 

```
Type '({ feed }: { feed: any; }) => Element' is not assignable to type 'FC<RouteComponentProps<{}, StaticContext, unknown>>'.
  Types of parameters '__0' and 'props' are incompatible.
    Property 'feed' is missing in type 'RouteComponentProps<{}, StaticContext, unknown> & { children?: ReactNode; }' but required in type '{ feed: any; }'.ts(2322)
AuthRoute.tsx(7, 3): The expected type comes from property 'component' which is declared here on type 'IntrinsicAttributes & Props'
```

In the given function, [set](https://github.com/fission-suite/webnative/blob/16c7edfbe34377ee6ec8ea378512c7f43102094f/src/ipfs/config.ts#L9), it takes an arg `userIpfs`. This arg is a js-ipfs instance. You would call the js-ipfs API to configure how it connects to other ipfs nodes.


-----------------------------------------


The `Posts.tsx` file logs `console.log("✅ feed file exists")` when I start the app. What is the feed file and where is it?

The `fs` here is the webnative module.
```js
  // src/pages/Posts.tsx
  const { fs, username } = useWebnative();
```

Likewise, uploading a photo would be a matter of `fs.write`ing an image blob.

---------------------------------------------------

So, that's a lot of state that is implied when using the `webnative` module.
Where does `fs` read from?

In `Posts.tsx`, we call fs.exists on a feedPath. The feedPath comes from
```js
const feedPath = fs.appPath(wn.path.file("feed.json"));
```

https://github.com/fission-suite/webnative#web-native-file-system

```js
// List the user's private files that belong to this app
await fs.ls(fs.appPath())
```

```js
// Create a sub directory and add some content
await fs.write( fs.appPath(wn.path.file("Sub Directory", "hello.txt")), "👋" )
```

So `fs.appPath` returns a path to this app's files.

------------------------------------------------------

From what I've read so far...
`webnative` seems to keep a merkle-dag of file-like data.

Where does it store the actual files? I assume `webnative` has some kind of
synchronization built in, so you could have a local copy + multiple remotes,
like git.

**we're using ipfs**

https://guide.fission.codes/developers/webnative/file-system-wnfs
> The Web Native File System (WNFS) is a file system built on top of the InterPlanetary File System (IPFS)

So it stores files in ipfs.

https://guide.fission.codes/developers/webnative/file-system-wnfs#publish
> The publish function synchronizes your file system with the Fission API and IPFS. WNFS does not publish changes automatically because it is more practical to batch changes in some cases.

* where do you define the ipfs 'remote'? 

> we run IPFS in the browser

So there is a local copy of the data, stored in-browser

> js-ipfs in browser by default only connects to other browser nodes, which aren’t connected to the “main” public IPFS network

> We run a secure websocket in order to connect it to Fission hosted IPFS nodes that are connected to the main network
> This is configurable — and anyone can run their own IPFS node / WSS to point at

Configure your ipfs remote -- [set](https://github.com/fission-suite/webnative/blob/16c7edfbe34377ee6ec8ea378512c7f43102094f/src/ipfs/config.ts#L9)

> You'd need to run your own [js-ipfs](https://www.npmjs.com/package/ipfs) instance and then connect to your remote node.
> We use https://www.npmjs.com/package/ipfs-message-port-client as a js-ipfs proxy and then use js-ipfs in a SharedWorker through an iframe.


-----------------------------------------


> you'd create a js-ipfs instance/client and pass that to webnative.
Then using js-ipfs you can connect to the other ipfs nodes.

> you would pass the js-ipfs instance/client to webnative via the [set](https://github.com/fission-suite/webnative/blob/16c7edfbe34377ee6ec8ea378512c7f43102094f/src/ipfs/config.ts#L9) function 

> `userIpfs`, the parameter in the function above, is the js-ipfs
> instance/client

So make calls to the js-ipfs client to configure how it connects to peer nodes


-----------------------------------------------------------

### How does authentication work? How does it know who I am?

https://guide.fission.codes/developers/webnative/auth#authentication

> Users authenticate once per browser in the Fission Auth Lobby. If the user is new to Fission, they are prompted to sign up. They may also link an existing account from another browser.

> Webnative stores user credentials in the browser, and authentication through a third-party is not necessary. Private credentials are stored as WebCrypto CryptoKeys


-----------------------------------------------


* [ ] step one -- just save a blog post
* [ ] how do you get the right `feed`? see /src/pages/Editor.tsx
  - could stringify the whole feed and get by CID?
  - see /src/pages/Posts.tsx
  ```js
      const feedPath = fs.appPath(wn.path.file("feed.json"));
      if (await fs.exists(feedPath)) {
  ```
* [ ] need to display existing posts on the 'home' view


-----------------------------------------------

## 10-13-2021

How do you add a blog post? Do you need to stringify it first?


