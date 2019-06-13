class Plane {
  constructor () {
    this.onLand = false;
  }

  land () {
    return this.onLand = true;
  }

  takeOff () {
    return this.onLand = false;
  }
}

module.exports = Plane