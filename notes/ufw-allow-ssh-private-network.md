---
title: Only allow SSH connection from private network on ufw
tags:
  - VPS
  - Networking
  - Security
  - DevOps
  - Ubuntu
---

So you created a new VPS instance, it happens to be on the same [VPC](https://en.wikipedia.org/wiki/Virtual_private_cloud) some [bastion server](https://en.wikipedia.org/wiki/Bastion_host). This is great.

You may want to take full advantage of this fact, by banning all packets except for TCP/80, TCP/443, ICMP, and SSH connections from inside VPC. Ubuntu has a firewall management tool called [`ufw`](https://help.ubuntu.com/community/UFW), which serves as a abstraction over [iptables](https://en.wikipedia.org/wiki/Iptables).

In the case of DigitalOcean, all VPS instances have two [networking interfaces](https://en.wikipedia.org/wiki/Network_interface): one for the publicly facing Internet, and the other for other machines inside the VPC.

You can see a list of all interfaces by invoking the [`ifconfig`](https://en.wikipedia.org/wiki/Ifconfig) command.

How do you know which of the interfaces is connected to the VPC? You can find that information from your VPS' dashboard, wherein they will show you the public IP address (for the Internet), and the private IP address (for the VPC).

So from that, you will be able to get the interface name (often called eth0, eth1, eth2, etc.). Jot down the name of the interface that is associated with the VPC.

And then, from there, we will now want to establish a firewall rule that will allow SSH connections to that interface. To do that, invoke the following commamd:

```shell
ufw allow in on eth1 from any to any proto tcp port 22
```

Let's break it down.

- `ufw` is the `ufw` program's name. All the space-delimited strings after it are the arguments that we will be passing in
- `allow` tells `ufw` that we want to add a new `allow` rule
- `in on eth1` states that our rule is exclusively for packets that are meant for the `eth1` interface
- `from any` states that we are allowing packets from any IP addresses (in the case of interface filtering, this rule is fine. But if we can't filter by interface, then we should ideally replace `any` with either an IP address, or an IP address range using the [CIDR subnet mask notation](https://docs.netgate.com/pfsense/en/latest/network/cidr.html))
- `to any` states that we are allowing all packets to go to any of the IP addresses that is assigned to the VPS. We could, if we wanted to, replace `any` with a either an IP address, or an IP address range using the CIDR subnet mask notation
- `proto tcp` means that the `allow` rule is for TCP packets. And finally…
- `port 22` indicates what port are the packets allowed to be sent to

Depending on what you want to achieve with the VPS, and how the VPS was set up, you may also want to consider deleting some pre-existing rules.

To do that, you will first want to list all rules:

```
ufw status numbered
```

And you should see the list of rules that you want to delete.

To delete the rule, invoke the following command:

```
ufw delete $RULE_NUMBER
```

Where `$RULE_NUMBER` is the rule that you want deleted.
