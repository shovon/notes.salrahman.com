---
title: Simple Gorilla WebSocket Wrapper
tags:
  - Go
  - WebSocket
---

So working with WebSockets provides a lot of control, but that comes at the cost of requiring a significant amount of boilerplate to get any code working.

The following is a wrapper around Gorilla WebSocket, that provides some sensible defaults.

```go
package ws

import (
	"net/http"
	"sync"
	"time"

	"wsauth/stoppable"

	"github.com/gorilla/websocket"
	"github.com/rs/zerolog/log"
)

const (
	writeWait = 60 * time.Second

	pongWait = 60 * time.Second

	pingPeriod = (pongWait * 9) / 10
)

type Message struct {
	MessageType int
	Message     []byte
}

// A wrapper for Gorilla's WebSocket
type Wrapper struct {
	stoppable.Stoppable
	mut      *sync.Mutex
	c        *websocket.Conn
	messages chan Message
}

func NewWrapper(c *websocket.Conn) Wrapper {
	var mut sync.Mutex

	wrapper := Wrapper{stoppable.NewStoppable(), &mut, c, make(chan Message)}

	go wrapper.pingLoop()
	go wrapper.readLoop()

	return wrapper
}

func UpgradeWebSocket(upgrader websocket.Upgrader, w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	return upgrader.Upgrade(w, r, nil)
}

func (w *Wrapper) pingLoop() {
	w.c.SetReadDeadline(time.Now().Add(pongWait))
	w.c.SetPongHandler(func(string) error {
		w.c.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

loop:
	for {
		select {
		case <-time.After(pingPeriod):
			w.c.SetWriteDeadline(time.Now().Add(writeWait))
			if err := w.WriteMessage(websocket.PingMessage, nil); err != nil {
				log.Info().Err(err).Msg("The end host probably closed the connection")
			}
		case <-w.OnStopped():
			break loop
		}
	}
}

func (w *Wrapper) readLoop() {
	for {
		w.mut.Lock()
		t, message, err := w.c.ReadMessage()
		w.mut.Unlock()
		if err != nil {
			w.Stop()
			return
		}
		w.messages <- Message{t, message}
	}
}

func (w *Wrapper) WriteMessage(messageType int, data []byte) error {
	w.mut.Lock()
	defer w.mut.Unlock()
	w.c.SetWriteDeadline(time.Now().Add(writeWait))
	return w.c.WriteMessage(messageType, data)
}

func (w *Wrapper) WriteJSON(v interface{}) error {
	w.mut.Lock()
	defer w.mut.Unlock()
	return w.c.WriteJSON(v)
}

func (w *Wrapper) MessagesChannel() <-chan Message {
	return w.messages
}
```

## Usage

```go
var upgrader = websocket.Upgrader{}

func handler(w http.ResponseWriter, r *http.Request) {
	// Set up the conection
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	defer c.Close()

	conn := ws.NewWrapper(c)
	defer conn.Stop()

	// m := <- c.Messages()
	// type, message := m.Type, m.Message
}
```
