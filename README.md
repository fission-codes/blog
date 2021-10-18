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

