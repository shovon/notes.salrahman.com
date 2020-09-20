---
title: Verifying an ECDSA-signed JWT using jsrsasign
tags:
  - JWT
  - JavaScript
  - ECDSA
---

It's as easy as:

```javascript
import jsrsasign from "jrsasign";

const publicKey = jsrsasign.KEYUTIL.getKey(publicKeyStr);

const isVerified = jsrsasign.KJUR.jws.JWS.verifyJWT(jwt, publicKey, {
  alg: ["ES256", "ES384", "ES512"],
});
```

## Source

- [Tutorial for JWT verification](https://github.com/kjur/jsrsasign/wiki/Tutorial-for-JWT-verification)

## Further Reading

- [Generate private keys for either ES256, ES384, or ES512](https://notes.salrahman.com/generate-es256-es384-es512-private-keys/)
