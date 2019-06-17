declare module 'a-syncquence' {

  interface ASyncquenceOptions {
    delay: number
  }

  type NextCallback = () => void

  class ASyncquence {
    constructor(opts?: ASyncquenceOptions)
    start(): void
    stop(): void
    next(): void
    push(task: (next: NextCallback) => void): this
    unshift(task: (next: NextCallback) => void): this
    count(): number
    clear(): this
    isRunning(): boolean
    onEnd(callback: () => void): this
    onError(callback: (error: Error) => void): this
    onNext(callback: () => void): this
  }

  export = ASyncquence
}
