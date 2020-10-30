---
title: SSH via a bastion server
tags:
  - OpenSSH
---

You have a server behind a [VPC](https://en.wikipedia.org/wiki/Virtual_private_cloud), and has firewall rules that forbid the server from being accessed directly. Fortunately, you have a [bastion server](https://en.wikipedia.org/wiki/Bastion_host) that is allowed to connect to the server behind the VPC, and will allow you to SSH to it.

You can use the bastion server proxy your way into the server behind the VPC.

Here's how:

```
ssh -tt $USERNAME_HOST_BASTION "ssh $USERNAME_HOST_OTHER_SERVER"
```

Without the `-tt` flag, we won't be able to interact with the shell session initiated on the other remote server.

The `$USERNAME_HOST_BASTION` is the login credentials to the bastion server.

The `$USERNAME_HOST_OTHER_SERVER` is the login credentials to the other server.
