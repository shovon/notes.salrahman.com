---
title: A Git alias for deleting locally merged branches
tags:
  - git
---

Create a file, and call it anything. Its content should look like this:

```shell
#!/usr/bin/env bash

git branch --merged | egrep -v "(^\*|master|dev)" | xargs git branch -d
```

Assuming that the above file is called `gitclearmerged`, then have it be executable:

```shell
chmod +x gitclearmerged
```

In your `~/.gitconfig` file, look for a section labeled `[alias]`.

Then, in that section, add the following value:

```text
	deletemerged = "!f() { <path to>/gitclearmerged; }; f"
```

**Be sure to replace `<path to>` with something else!**

Save the file, and you should be able to invoke the following commnad:

```shell
git deletemerged
```
