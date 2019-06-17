declare module 'a-syncquence' {

  interface ASyncquenceOptions {
    delay: number
  }

  class ASyncquence {
    start(): void
    stop(): void
    next(): void
    push(task: Function): this
    unshift(task: Function): this
    count(): number
    clear(): this
    isRunning(): boolean
    onEnd(callback: Function): this
    onError(callback: Function): this
    onNext(callback: Function): this
  }

  export = ASyncquence
}
