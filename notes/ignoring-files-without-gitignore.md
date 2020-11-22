---
title: Ignoring Files Without .gitignore
---

In the `.git` folder, there is a directory called `info`, and in it, there is a filed called `exclude`.

So `.git/info/exclude` is your alternative to .gitignore.

**The benefit:** let's say only you care about a specific file, but highly unlikely that anyone else would care about that specific file. It doesn't make sense to pollute the `.gitignore` just for ignoring a file that only you care about.
