---
title: Generate private keys for either ES256, ES384, or ES512
tags:
  - OpenSSL
  - Elliptic-Curve Cryptography
  - Cryptographic Signatures
  - ECDSA
---

In one of my other notes, I went over [how to generate a set of elliptic-curve keypair using OpenSSL](/generate-elliptic-curve-keypair-openssl/).

This note will go over how to generate curves for either ES256, ES384, and ES512.

There is not much to it. You simply need to change one of the parameters for the EC private key generation. The public key generation is exactly the same as the earlier tutorial on how to generate a set of EC keypair.

First, the private key:

```shell
# Replace `private.ec.key` with anything you want.
openssl ecparam -name $CURVE -genkey -noout -out private.ec.key
```

Replace `$CURVE` with any of the following:

| Algorithm | Curve      |
| --------- | ---------- |
| ES256     | prime256v1 |
| ES384     | secp384r1  |
| ES512     | secp521r1  |

Then, to generate the public key:

```shell
# Replace `public.pem` with anything that you want.
#
# Be sure that `private.ec.key` is pointing to the correct private key path.
openssl ec -in private.ec.key -pubout public.pem
```

## Source

- [How to generate RSA and EC keys with OpenSSL](https://connect2id.com/products/nimbus-jose-jwt/openssl-key-generation)
