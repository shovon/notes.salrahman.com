---
title: Generate elliptic-curve keypair in OpenSSL
tags:
  - OpenSSL
  - Elliptic-Curve Cryptography
---

First, create the private key.

```shell
# Feel free to name `private.ec.key` whatever you want
openssl ecparam -name prime256v1 -genkey -noout -out private.ec.key
```

Next, from the private key, generate the public key.

```shell
# Replace `public.pem` with anything that you want.
#
# Be sure that `private.ec.key` is pointing to the correct private key path.
openssl ec -in private.ec.key -pubout public.pem
```

## Source

- [Generate EC KeyPair from OpenSSL command line](https://stackoverflow.com/a/51179147/538570)
