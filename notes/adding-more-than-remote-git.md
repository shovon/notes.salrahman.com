---
title: Pushing to more than one remote in a single git push command
tags:
  - git
---

If `$REMOTE_URL` is the location to which you want to push to (replace `$REMOTE_URL` with an actual URL), then, for an existing remote—as indicated by `$REMOTE_NAME`—you would invoke the following command:

```shell
git remote set-url --add --push $REMOTE_NAME $REMOTE_URL
```

For me, I usually set `$REMOTE_NAME` to just `origin`. But of course, for various reasons, you can choose an entirely different remote name.
