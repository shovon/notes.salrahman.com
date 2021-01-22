---
title: Resolve Vim's dylib issue with macOS
tags:
  - Linux
  - DevOps
---

Perhaps you've been using your macOS setup for a while, and then you try to run Vim after a while. But then, instead of Vim starting up, an error is raised. Here's the error:

```
dyld: Library not loaded: /usr/local/opt/lua/lib/liblua.5.3.dylib
  Referenced from: /usr/local/bin/vim
  Reason: image not found
```

So what caused this is that after using brew for a while, an older version of Lua that Vim relies on may have been uninstalled. To be perfectly honest, I have no idea exactly what may have caused this issue. But whatever it is, we need to fix it.

A good fix would be to search for all versions of Lua on homebrew. To do that, invoke the following command:

```shell
brew search lua
```

Which should output something like this:

```
==> Formulae
lua ✔
lua@5.1
lua@5.3
luabind
luajit
luaradio
luarocks
luaver
```

Install Lua version 5.3.

```shell
brew install lua@5.3
```

Then run:

```shell
brew link --overwrite lua@5.3
```

If there are other libraries that have been royally screwed up by Homebrew, and that Vim relies on them, then do follow the above pattern for all other libraries.

Good luck!

## Source

- [dyld: Library not loaded: /usr/local/lib/liblua.5.1.5.dylib](https://stackoverflow.com/questions/27172680/dyld-library-not-loaded-usr-local-lib-liblua-5-1-5-dylib)
