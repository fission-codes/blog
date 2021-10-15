# Blog App

The `blog` app provides a "web native" blogging experience with users creating and publishing content in a filesystem they control all from the browser and offline-first.

Users log in to their blog where they are presented with an admin interface with the following options:

* Posts: where all created posts (draft and unpublished) are listed with options to edit/delete or create new.
* Settings: where the user can edit some metadata about their blog (title)

## Authentication / Authorization 

Users log in via [webnative auth](https://guide.fission.codes/developers/webnative/auth). 

## Data model 

All data is stored in the user's [webnative file system](https://guide.fission.codes/developers/webnative/file-system-wnfs) (aka WNFS). There are three primary components that make up the "data" model:

* The private "feed": this is a [JSON Feed](https://www.jsonfeed.org/) document stored in the app path that contains metadata about *all* posts as JSON feed "items". 
  * IDs will need to be generated (UUID / some other random identifier probably the easiest)
  * content_text / content_html may or may not be the best place to store the full content of a post - perhaps a snippet/teaser? 
* The raw (Markdown?) content and assets for posts:
  * While the body content *could* exist in the content_text in the feed document, it may be nice to have separate documents that could be edited elsewhere.
  * Suggested structure `APP_DIR/posts/POST_ID/index.md`
* The published blog data: the blog app will also behave like an in-browser static site generator (aka SSG). On publish, all posts should be transformed (with a template) into html pages and published as a fission app via the [platform APIs](https://guide.fission.codes/developers/webnative/platform)
  
## Template system

* To start: A simple, standard HTML template should be applied.
* Future: Allow users to specify / edit templates (can all just live in their filesystem).
* TBD: template language(s) to use.