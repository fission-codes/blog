# Fission Blog

A React-based blogging engine powered by [Fission's Webnative SDK](https://github.com/fission-suite/webnative).


## Development

Dependencies (via Nix) either by using [nix-direnv](https://github.com/nix-community/nix-direnv) or running:

```
nix-shell
```

Development server:

```
npm start
```

Tests:
```
npm test
```

Cypress test:
```
npm run cypress-test
```

## cypress

in `cypress.json`:
```js
{
    "chromeWebSecurity": false
}
```

This `chromeWebSecurity` part is because of [this cross origin situation](https://docs.cypress.io/guides/references/error-messages#Cypress-detected-a-cross-origin-error-happened-on-page-load)

Interestingly the identity used in the cypress tests persists between runs
of the tests. I would recommend manually clicking through the sign in process
the first time the tests run, with a fake email address

---------------------------------------------

Following the webnative instructions for file paths

https://github.com/fission-suite/webnative#web-native-file-system


## How do other people read my blog posts?

It saves things to ipfs as is, how do you determine where, if anywhere, this is visible on the web?

------------------------------------

You have a public URL path of USERNAME.files.fission.name/p/PATH-TO-BLOG

Sharing this path would be one thing to have in the editor -- maybe like "View published blog" or something?

And, in the future, the blog editor might "publish" to an app, so it could also be nichothsblog.fission.app -- which you can of course add a custom domain to.

-------------------------------------

How to configure the domain name?
