---
title: `useState` VS Code Snippet
tags:
  - VS Code
  - React
---

Just create the following snippet, and you should be able to quickly generate a `useState` invocation.

```
{
	"useState": {
		"prefix": "useState",
		"body": "const [${1}, set${1/(^[a-zA-Z])(.*)/${1:/upcase}${2}/}] = useState(${2:default${1/(^[a-zA-Z])(.*)/${1:/upcase}${2}/}});",
		"description": "Use state, but for React"
	},
}
```
