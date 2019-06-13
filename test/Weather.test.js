const assert = require('assert');
const Weather = require('../src/Weather');

describe('Weather', () => {
  it('should report the weather', () => {
    const weather = new Weather()
    const fine = {
      stormy: false,
    }
    const stormy = {
      stormy: true
    }
    assert.deepEqual(weather._fine(), fine.stormy)
    assert.deepEqual(weather._stormy(), stormy.stormy)
  })
});