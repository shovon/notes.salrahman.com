---
title: The "'qemu-system-aarch64' executable file not found" error
tags:
  - Podman
  - Homebrew
  - macOS
---

So perhaps you've had Podman installed for a while, and you think that it's a good idea to upgrade podman to the latest version.

However, Homebrew suddenly decides that it won't let you, because there are linked executables in the Cellar (more specifically related to qemu-hvf). So, frustrated, you decide to unlink everything related to podman, and finally go on ahead and upgrade podman.

Great.

Then, when attempting to initialize and start machines, Podman complains that the executable file named `qemu-system-aarch64` cannot be found.

The solution is simply link everything related to `qemu` by invoking the following command:

```
brew link qemu
```

Done.

> **Note**
>
> If that didn't work, then I have no idea on how I can help you.
