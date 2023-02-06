---
title: 2D camera zoom towards the mouse
tags:
	- 2D graphics
	- computer graphics
	- math
---

So you want to implement zooming, such that it appears to zoom *towards* the mouse cursor.

Zooming is easy. Finding the camera position so that it will translate *towards* the cursor is tricky, but doable.

The trick is to find some function f to find the global mouse position (the mouse position not only on screen, but where it is pointing in the world as the cursor moves around the screen).

```
M = f(m, c, z)
```

Where

- `M` is a vector representing the global mouse position
- `m` is a vector representing the screen mouse position
- `c` is a vector reprseenting the camera position
- `z` is a number representing the zoom level

Given a previous camera `c1` with a previous zoom `z1`, if we know `z2` then we can find `c2`. We know that the mouse position `m` will remain the same. And we also know that the global mouse position will remain the same, so the following equation for our hypothetical `f` will hold.

f(m, c1, z1) = f(m, c2, z2)

That's all there is to it to finding our new camera position as we zoom to it. As long as we know the contents of both functions, we can perform some algebraic manipulation to get to our answer.

I'm not giving the answer since, every problem is unique, and from experience, there just isn't one formula.

That said, there is a general theme.

And it's this:

Find the global mouse position M.

In one of my problems, the solution is:

```
M = (m - 0.5s) * z + c
```

Of course, the above equation for finding the global mouse position will fail in some problems.

But assuming that that is our answer, then we can simply rewrite the above as follows:

```
(m - 0.5s) * z1 + c1 = (m - 0.5s) * z2 + c2
```

And we can do some basic algebraic manipulation to find our c2.

I hope this helps