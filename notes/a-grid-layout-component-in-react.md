---
title: A grid layout component in React
tags:
  - React
---

This layout spreads your elements evenly, horizontally, and vertically.

```typescript
import * as React from "react";

type GridProps = {
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

function Grid({ children }: GridProps) {
  children = Array.isArray(children) ? children : [children];
  const columns = Math.ceil(Math.sqrt(children.length));
  const rows = Math.ceil(children.length / columns);
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
}
```

And the usage is simple:

```typescript
<Grid>
  <div>Element 1</div>
  <div>Element 2</div>
  <div>Element 3</div>
  <div>Element 4</div>
</Grid>
```

And you should see a 2x2 grid.
