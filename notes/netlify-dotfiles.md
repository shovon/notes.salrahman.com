---
title: Have Netlify serve out dotfiles
tags:
  - Netlify
---

Netlify currently does not serve out dotfiles, for some reason.

A workaround is instead of saving dotfiles directly, save them as non-dotfiles, and use `_redirects` to have request paths with dotfiles to serve out the non-dotfiles.

This is especially useful for applications that need to access a `.well-known` folder.

So, let's say you had a folder that reads `/v1/.well-known`. Save it instead as `/v1/well-known` (**note**: the dot right before `well-known is missing).

Then, in your `_redirects` file, you'd have the following line:

```
/v1/.well-known/* /v1/well-known/:splat 200!
```
