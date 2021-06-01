---
title: How to use systemd to have your apps running in the background forever
tags:
  - Linux
  - DevOps
---

If you want your apps to run forever, that is:

- run when the program crashes
- starts when the operating system starts

then you'd simply create a new systemd unit. To do that, we'll create a systemd unit file.

For a service named "foobar", we will create it in `/lib/systemd/system/foobar.service`.

And the content would look like so:

```systemd
[Unit]
Description=Does something
After=network.target

[Service]
Type=simple
User=root

# Change the following two configs
WorkingDirectory=/the/working/directory
ExecStart=/path/to/program

Restart=always

[Install]
WantedBy=multi-user.target
```

Then restart the systemctl daemon.

```shell
systemctl daemon-reload
```

Then, to run your app as a service, invoke the following command.

```shell
sudo systemctl start foobar
```

And then, to ensure that it starts on boot, invoke the following command.

```shell
sudo systemctl enable foobar
```

Whether things went well or not, you should still see absolutely nothing.

If your application is a web server, you can ping it with a cURL request, to see if it's working.

If it isn't, then you can take a look at the logs to see what may have gone wrong.

Invoke the following command:

```shell
sudo journalctl -xe
```

Hopefully you should have a good idea on how to get things working.

Digital ocean has a [comprehensive article](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files) on what systemd is, and how you can take full advantage of it.
