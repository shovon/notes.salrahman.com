---
title: Creating a Custom RxJS Operator
tags:
  - JavaScript
  - RxJS
---

So you want to create a new RxJS operator? This article will demonstrate on how to create a custom operator, where its sole purpose is to simply represent the original observable.

In other words, the operator is merely the identity operator, or, to put it in simpler terms, does almost nothing at all.

E.g. `observable.pipe(myCustomOperator())` is equivalent to just `observable`.

```typescript
/**
 * Here is a custom operator. By convention, an operator is a function, that in-
 * turn, returns a function, and that function returns an observable.
 */
function myCustomOperator<T>(/* Some parameters, here, if need be */) {
  // This is the function that will return the obsevable.
  return (source: Observable<T>) => {
    return new Observable((subscriber) => {
      // Of course, you can't do much without actually having subscribed to the
      // source, or a synthesis, thereof.
      //
      // Here, we're just going to subscribe to the source.
      source.subscribe((value) => {
        // Pass along the value, without doing much at all.
        subscriber.next(value);
      });

      // Note: we could have just invoked `source.subscribe(subscriber)`, but we
      // need to write a demo such that you can modify this code, for the
      // purposes of creating a custom operator.
    });
  };
}
```
