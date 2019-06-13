const assert = require('assert');
const Plane = require('../src/Plane');

describe('Plane', () => {
  it('should have an onLand status', () => {
    const plane = new Plane()
    assert.equal(plane.onLand, false)
  });

  it('should update the status upon landing', () => {
    const plane = new Plane()
    plane.land()
    assert.equal(plane.onLand, true)
  })

  it('should update the status upon take off', () => {
    const plane = new Plane()
    plane.land()
    plane.takeOff()
    assert.equal(plane.onLand, false)
  })
});