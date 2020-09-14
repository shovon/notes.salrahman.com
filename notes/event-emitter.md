---
title: An EventEmitter class
tags:
  - JavaScript
---

```js
/**
 * This is a class that is analogous to the DOM's `EventTarget` API.
 *
 * It is the class for adding event listeners, and emitting events.
 *
 * Usage:
 *
 *     const emitter = new EventEmitter()
 *
 *     emitter.addEventListener('foo', (value) => {
 *       // Do whatever with the value.
 *     });
 *
 *     // Then somewhere in your code…
 *     emitter.dispatchEvent('foo', 'the value');
 */
class EventEmitter {
  // A mapping of event keys, to sets of event listeners.
  _listeners = new Map();

  /**
   * Adds an event listener to the labeled event.
   * @param event A string to represent an event name.
   * @param callback A callback that will be called when an event is emitted.
   */
  addEventListener(event, callback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(callback);
  }

  /**
   * Removes the specified callback, from the list of callbacks.
   * @param event A string to represent an event name.
   * @param callback The callback to remove.
   */
  removeEventListener(event, callback) {
    if (this._listeners.has(event)) {
      const listeners = this._listeners.get(event);
      listeners.delete(callback);
      if (listeners.size <= 0) {
        this._listeners.delete(event);
      }
    }
  }

  /**
   * Dispatches an event, and invokes all the callback listening in on the
   * event, as labeled by the `event` parameter.
   * @param event A string that represents which event to emit.
   * @param value The value to emit.
   */
  dispatchEvent(event, value) {
    if (this._listeners.has(event)) {
      for (const listener of this._listeners.get(event)) {
        listener(value);
      }
    }
  }
}
```
