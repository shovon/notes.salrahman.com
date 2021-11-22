---
title: Using Podman instead of Docker on macOS
tags:
  - Podman
  - Docker
  - OCI Containers
  - Containerization
---

For some reason, people are moving away from Docker, and onto Podman. Whatever the reason, both Docker and Podman work on top of the same standard, founded by the [Open Container Intitiative](https://opencontainers.org/). Therefore, Podman should be a perfecly safe drop-in replacement for Docker.

On macOS, use [Homebrew](https://brew.sh/) to install podman.

```shell
brew install podman
```

Then, using the `podman` utility, initialize a QEMU virtual machine by invoking this one simple command:

```shell
podman machine init
```

> **Note**
>
> You should be able to list out the machine(s) that was created by the `init` command, by invoking
>
> ```
> podman machine list
> ```

Finally, start the machine by invoking

```shell
podman machine start
```

**Now you're all done!**

> **Note**
>
> If you wanted to ensure that the machine is running, then you can invoke the following command to see that
>
> ```
> podman machine list
> ```
>
> If you can't see any running virtual machines, then something's wrong, and I have no idea on how I can help you with that.

## Bonus

If you're familiar with Docker, then the list of commands available in Podman should equally match that of Docker.

You can alias `podman` for `docker`, in shell.

```shell
alias docker=podman
```
