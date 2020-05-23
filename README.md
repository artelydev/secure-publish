# :no_entry: secure-publish :no_entry_sign:

![npm](https://img.shields.io/npm/dw/secure-publish)

Private packages publishing made easy

---

## Motivation

#### TL;DR
To prevent your private packages available publicly on `npmjs` or `yarnpkg`.

---

If you are using `npm publish` for your private packages e.g. for publishing
them to a local npm registry or to your own private npm registry - at some point
you may end up with your package being available publicly on `npm` or `yarn` registry if
something will go wrong.

This tool is just another safety catch for such situations, not allowing one
to simply pass through without all the needed setup.

## Installation

```bash
$ npm i -D secure-publish
```

Add pre-publish script in `package.json`:
```bash
{
  ...,
  "scripts": {
    "prepublishOnly": "secure-publish"
  },
  ...
}
```

Set a private registry in `.npmrc`:

```bash
registry=https://private.registry.com
```

## Scoped packages

Just add the scope in your `package.json` and you're done:
```bash
{
  "name": "@private-scope/private-package",
  ...
}
```
---
It is also **recommended** providing custom registry for scope in your `.npmrc` like this:

```bash
@private-scope:registry=https://private-scope.registry.com
```

## Usage


```bash
$ npm publish
```

---
:dizzy:
