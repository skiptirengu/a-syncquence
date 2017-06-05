'use strict';

const should = require('should');

describe('Sequence', function () {

  let Sequence = require('./../index.js'), sequence;

  beforeEach(function () {
    sequence = new Sequence({ delay: 10 });
  });

  it('should emit error event', function run(done) {
    sequence.push(() => {
      throw new Error('foo bar qux');
    });
    sequence.on('error', (err) => {
      err.message.should.be.eql('foo bar qux');
      done();
    });
    sequence.start();
  });

  it('should start and run the queue', function run(done) {
    let text = '';
    sequence.push((next) => {
      text += 'one';
      sequence.isRunning().should.be.true();
      setTimeout(next, 30);
    });
    sequence.push((next) => {
      text += ',two';
      sequence.isRunning().should.be.true();
      setTimeout(next, 20);
    });
    sequence.push((next) => {
      text += ',three';
      sequence.isRunning().should.be.true();
      setTimeout(next, 10);
    });
    sequence.push((next) => {
      text.should.be.eql('one,two,three');
      next();
    });
    sequence.once('end', () => {
      sequence.isRunning().should.be.false();
      done();
    });
    sequence.start();
  });

  it('should clear the queue', function run() {
    sequence.push((next) => {
      next();
    });
    sequence.push((next) => {
      next();
    });
    sequence.push((next) => {
      next();
    });
    sequence.count().should.be.eql(3);
    sequence.clear().count().should.be.eql(0);
  });
});