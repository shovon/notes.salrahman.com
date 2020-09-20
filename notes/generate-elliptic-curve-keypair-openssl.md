---
title: Generate elliptic-curve keypair in OpenSSL
tags:
  - OpenSSL
---

First, create the private key.

```shell
# Feel free to name `private.ec.key` whatever you want
openssl ecparam -name prime 256v1 -genkey -noout -out private.ec.key
```

Next, from the private key, generate the public key.

```shell
openssl ec -in private.ec.key -pubout public.pem
```
