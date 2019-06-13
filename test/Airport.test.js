const assert = require('assert');
const Airport = require('../src/Airport');

class FakePlane {
  constructor (serialNumber = Math.random()) {
    this.serialNumber = serialNumber;
  }

  land () {
    return this.onLand = true;
  }

  takeOff () {
    return this.onLand = false;
  }
}

class FakeGoodWeather {
  getForecast () {
    return this.stormy = false;
  }
}

class FakeBadWeather {
  getForecast () {
    return this.stormy = true;
  }
}

describe('Airport', () => {
  it('should instruct a plane to land', () => {
    const goodWeather = new FakeGoodWeather()
    const airport = new Airport(goodWeather);
    const plane = new FakePlane()
    airport.land(plane)
    assert.deepEqual(airport.planes, [plane])
    assert.equal(airport.planes.length, 1)
  });
  
  it('should instruct a plane to update its status upon landing', () => {
    const goodWeather = new FakeGoodWeather()
    const airport = new Airport(goodWeather);
    const plane = new FakePlane()
    airport.land(plane)
    assert.equal(plane.onLand, true)
    assert.equal(airport.planes.length, 1)
  })

  it('should instruct a plane to take off and to update its status', () => {
    const goodWeather = new FakeGoodWeather()
    const airport = new Airport(goodWeather);
    const plane = new FakePlane()
    airport.land(plane)
    airport.takeOff(plane)
    assert.deepEqual(airport.planes, [])
    assert.equal(plane.onLand, false)
    assert.equal(airport.planes.length, 0)
  })

  it('should instruct a specific plane to take off and to update its status', () => {
    const goodWeather = new FakeGoodWeather()
    const airport = new Airport(goodWeather);
    const plane1 = new FakePlane()
    const plane2 = new FakePlane()
    airport.land(plane1)
    airport.land(plane2)
    airport.takeOff(plane1)
    assert.deepEqual(airport.planes, [plane2])
    assert.equal(plane1.onLand, false)
    assert.equal(plane2.onLand, true)
    assert.equal(airport.planes.length, 1)
    
  })

  it('should receive the weather forecast upon creation', () => {
    const airport = new Airport();
    assert.notEqual(airport.weather.stormy, null)
  })

  it('should prevent take off if the weather is stormy', () => {
    const badWeather = new FakeBadWeather()
    const airport = new Airport(badWeather);
    const plane = new FakePlane()
    airport.planes.push(plane)
    assert.equal(airport.planes.length, 1)
    assert.equal(airport.takeOff(plane), 'Error: Weather too stormy for take off')
    assert.equal(airport.planes.length, 1)
  })

  it('should prevent landing when stormy', () => {
    const badWeather = new FakeBadWeather()
    const airport = new Airport(badWeather);
    const plane = new FakePlane()
    assert.equal(airport.land(plane), 'Error: Weather too stormy for landing')
    assert.equal(airport.planes.length, 0)
  })

  it('should have a default capacity of 10 planes', () => {
    const goodWeather = new FakeGoodWeather()
    const airport = new Airport(goodWeather)
    const plane = new FakePlane()
    for (var i = 0; i < 10; i++) {
      airport.planes.push(plane)
    }
    assert.equal(airport.land(plane), 'Error: Airport is full, cannot land plane')
    assert.equal(airport.planes.length, 10)
  })

  it('should override default capacity with given value', () => {
    const goodWeather = new FakeGoodWeather()
    const airport = new Airport(goodWeather, 2)
    const plane = new FakePlane()
    airport.planes.push(plane)
    airport.planes.push(plane)
    assert.equal(airport.land(plane), 'Error: Airport is full, cannot land plane')
    assert.equal(airport.planes.length, 2)
  })

  it('should only take off planes from the correct airport', () => {
    const goodWeather = new FakeGoodWeather()
    const airport1 = new Airport(goodWeather);
    const airport2 = new Airport(goodWeather);
    const plane1 = new FakePlane()
    const plane2 = new FakePlane()
    airport1.land(plane1)
    airport2.land(plane2)
    airport1.takeOff(plane1)
    assert.deepEqual(airport1.planes, [])
    assert.deepEqual(airport2.planes, [plane2])
    assert.equal(plane1.onLand, false)
    assert.equal(plane2.onLand, true)
    assert.equal(airport1.planes.length, 0)
    assert.equal(airport2.planes.length, 1)
  })
});