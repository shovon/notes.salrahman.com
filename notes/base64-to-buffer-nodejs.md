---
title: Base64 string to Node.js Buffer (Node.js 6+)
tags:
  - JavaScript
  - Node.js
---

It's just:

```javascript
const buf = Buffer.from(b64string, "base64");
```
