'use strict';

const util = require('util');
const EventEmitter = require('events');

function ASyncquence(opts) {
  if (!(this instanceof ASyncquence)) return new ASyncquence(opts);
  EventEmitter.call(this);
  opts = opts || {};

  /**
   * @type {Array}
   * @private
   */
  this._queue = [];
  /**
   * @type {boolean}
   * @private
   */
  this._running = false;
  /**
   * @type {number}
   * @private
   */
  this._delay = opts.delay || 0;
}
util.inherits(ASyncquence, EventEmitter);

ASyncquence.prototype.start = function () {
  if (this._running) return;
  Promise.resolve()
    .then(() => this._run())
    .catch(err => this.emit('error', err));
};

ASyncquence.prototype.stop = function () {
  this.clear();
  this.next();
};

ASyncquence.prototype.push = function (task) {
  this._queue.push(task);
  return this;
};

ASyncquence.prototype.unshift = function (task) {
  this._queue.unshift(task);
  return this;
};

ASyncquence.prototype.count = function () {
  return this._queue.length;
};

ASyncquence.prototype.clear = function () {
  this._queue.splice(0, this._queue.length);
  return this;
};

ASyncquence.prototype.isRunning = function () {
  return this._running;
};

ASyncquence.prototype._run = function () {
  const current = this._queue.shift();
  const next = function () {
    if (this._delay) {
      setTimeout(() => this._run(), this._delay);
    } else {
      this._run();
    }
  }.bind(this);

  if (current == undefined) {
    this._running = false;
    this.emit('end');
  } else {
    this._running = true;
    current(next);
  }
}

ASyncquence.prototype.onEnd = function (cb) {
  if (!this._isBinded('end')) this.on('end', cb);
  return this;
}

ASyncquence.prototype.onError = function (cb) {
  if (!this._isBinded('error')) this.on('error', cb);
  return this;
}

ASyncquence.prototype.onNext = function (cb) {
  if (!this._isBinded('next')) this.on('next', cb);
  return this;
}

ASyncquence.prototype._isBinded = function (event) {
  return this.listenerCount(event) > 0;
};

module.exports = ASyncquence;