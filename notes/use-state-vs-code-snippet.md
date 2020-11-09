---
title: A "useState" VS Code Snippet
tags:
  - VS Code
  - React
---

[Create the following snippet](/create-a-snippet-in-vs-code/), for JavaScript, TypeScript, and any other languages that look similar enough in order for the following snippet to work mostly fine.

```
{
	"useState": {
		"prefix": "useState",
		"body": "const [${1}, set${1/(^[a-zA-Z])(.*)/${1:/upcase}${2}/}] = useState(${2:default${1/(^[a-zA-Z])(.*)/${1:/upcase}${2}/}});",
		"description": "Use state, but for React"
	},
}
```

The reason why I claim that it's preferable to create a snippet for both TypeScript and JavaScript but not their React variants, is because `useState` can also work inside a custom hook. Custom hooks don't need JSX.
