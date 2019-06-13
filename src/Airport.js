const Weather = require('./Weather')

class Airport {
  constructor (weather = new Weather(), capacity = 10) {
    this.planes = []
    this.weather = weather;
    this.capacity = capacity;
  }

  land (plane) {
    if (this._stormy()) {
      return new Error('Weather too stormy for landing')
    } else if (this._full()) {
      return new Error('Airport is full, cannot land plane')
    } else {
      plane.land();
      return this.planes.push(plane);
    }
  }

  takeOff (plane) {
    if (this._stormy()) {
      return new Error('Weather too stormy for take off')
    } else {
      plane.takeOff()
      return this.planes.splice(this.planes[plane], 1)
    }
  }

  _stormy () {
    this.weather.getForecast()
    return this.weather.stormy;
  }

  _full () {
    return this.planes.length === this.capacity;
  }
}

module.exports = Airport;