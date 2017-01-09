var fibonacci = require('./index').fibonacci;
var log = require('./log').log;
var should = require('should');

// fibonacci(1).should.equal(1);


describe('test -=-=> index.js', function () {
  it('should equal 55 when n === 10', function () {
    fibonacci(10).should.equal(55);
  });

  it('should print HAHA', function() {
  	fibonacci(1).should.above(0);
  })

  it(log(), function() {
  	fibonacci(6).should.above(3);
  })

  it(log(), function() {
  	fibonacci(6).should.above(3);
  })

  it(log(), function() {
  	fibonacci(6).should.above(3);
  })

  it(log(), function() {
  	fibonacci(6).should.above(3);
  })

  it(log(), function() {
  	fibonacci(6).should.above(3);
  })

  it(log(), function() {
  	fibonacci(6).should.above(3);
  })

  it(log(), function() {
  	fibonacci(6).should.above(3);
  })
});