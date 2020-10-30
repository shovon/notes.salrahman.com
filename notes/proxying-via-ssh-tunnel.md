---
title: Proxying via SSH tunnel
tags:
  - OpenSSH
  - Networking
---

If there is some Internet application running on a server (such as MySQL, MongoDB, etc.), that has its port behind a firewall, then interacting with those applications will be impossible without you directly being in the machine itself.

There is a solution, however. It's through the use of SSH tunnels.

Here's how we would go about using SSH tunneling to forward a remote port, to the local system.

```
ssh -N -L $LOCAL_EXPOSED_PORT:$INBOUND_HOST:$REMOTE_EXPOSED_PORT $REMOTE_HOST_AND_LOGIN
```

Here are what the above variables represent:

- `$LOCAL_EXPOSED_PORT` represents the local port via which we should be able to connect to the remote host (e.g. our local application will hit `$LOCAL_EXPOSED_PORT` to hit the remote application)
- `$INBOUND_HOST` represents the inbound host (typically either localhost or 127.0.0.1)
- `$REMOTE_EXPOSED_PORT` the remote port to which we want proxied to the local endpoint
- `$REMOTE_HOST_AND_LOGIN` the SSH login information, for the server (usually comes in the format of `user@host`)

In the above SSH command, the `-N` flag means that we don't want to invoke any commands, and that we just want to forward the port. Without `-N`, not only will the port be forwarded, but, the command going to execute (typically, without specifying any command, the default configured shell is going to run).

## Hopping to another server

Now, what if we wanted to perform a hop through a server (such as a [bastion server](https://en.wikipedia.org/wiki/Bastion_host))?

Then we'd omit the `-N` flag, and instead invoke yet another tunneling command from the remote server. Assuming OpenSSH is installed in the intermediate server, then we'd run the hop like so:

```
ssh -L 3306:localhost:3307 root@remote-endpoint \
  "ssh -N -L 3307:localhost:3306 root@database-endpoint"
```

That is, we're not only tunneling the remote `3307` port over to the local `3306`, but we're telling our local OpenSSH client to invoke the command `ssh -N -R 3307:localhost:3306 root@database-endpoint`; that is, that aforementioned command is running on the remote server. And the whole purpose of that other command is to to tunnel the remote host's 3306 over to the local 3307.

So effectively, we connect to the database via local 3306 -> intermediate 3307 -> remote 3306.

I will leave it to you to you to figure out how you would go about hopping over even more intermediate servers.
