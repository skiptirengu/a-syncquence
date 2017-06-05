# Simple sync queue for async tasks

a-syncquence provides a simple queue for async tasks.

## API

### ASyncquence.start()
Start the queue

### ASyncquence.stop()
Stop the queue

### ASyncquence.next()
Emits a `next` event

### ASyncquence.push()
Appends a new task to the end of the queue

### ASyncquence.unshift()
Appends a new task to the beginning of the queue

### ASyncquence.count()
Number of tasks queued

### ASyncquence.clear()
Clear the queue

### ASyncquence.isRunning()
Whether the queue is running

### ASyncquence.onError()
Binds an `error` event if there is none

### ASyncquence.onEnd()
Binds an `end` event if there is none

### ASyncquence.onNext()
Binds an `next` event if there is none


## EVENTS

### end
Emitted when the queue is empty

### next
Emitted when the queue starts the "next" task

### error
Emitted when the current task throws an error