---
title: Cross-origin cookie sharing for AJAX requests
tags:
  - AJAX
  - Security
  - Cookies
  - CORS
---

Servers can tell browsers to store cookies, when the user browses the site.

However, with the exception of scripts that issue AJAX requests. Unless invoked in a specific way, and that the server agrees to it, browsers, by default, will not share cookies with the server.

You will have to make three changes.

- the server should have `Access-Control-Allow-Credentials` set to `true` in the headers
- the server should have `Access-Control-Allow-Headers` cannot be a wildcard
- the server should have `Access-Control-Allow-Origin` cannot be a wildcard
- when using `fetch`, the init options should have the `credentials` property set to `'include'`, e.g.

```javascript
const response = await fetch("https://example.com", {
  credentials: "include",
});
```
