---
title: Raising errors and handling them in Go
tags:
  - Go
  - Design pattern
---

In Go, you don't throw exceptions, but intead have the function return the error, as the last parameter of the function.

In other languages—specifically object-oriented languages—if you wanted to communicate a specific _type_ of error, you would create a class that inherits some `Exception` class, and throw an instance of that.

In Go, you typically return an object that implements the `error` interface, and then use reflections to determine what type of error it is.

But we can go simpler than that.

You can initialize a global variable that is of type `*error`, and simply return that variable, and then compare.

For example.

```go
var ErrSomething = errors.New("some error")

func FortyTwo(v int) (int, error) {
  if v != 42 {
    return v, ErrSomething
  }
  return v, nil
}

func main() {
  v, err := FortyTwo(42)
  if err != nil {
    panic(err)
  }
  fmt.Printf("%d\n", v)
}
```

But let's say your error message contains more than just a hard-coded string.

Then in this case, you'd use reflections.

```go
type Not42Error struct {
  Value int
}

var _ error = &Not42Error{}

func (n Not42Error) Error() string {
  return fmt.Sprintf("expected 42, but got %d", n.Value)
}

func FortyTwo(v int) (int, error) {
  if v != 42 {
    return v, &Not42Error{v}
  }
  return v, nil
}

func main() {
  v, err := FortyTwo(42)
  if err != nil {
    if n, ok := err.(*Not42Error); ok {
      panic(fmt.Errorf("PLease provide 42, and not %d", n.Value))
    } else {
      panic(err)
    }
  }
  fmt.Printf("%d\n", v)
}
```
