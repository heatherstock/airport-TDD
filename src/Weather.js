class Weather {
  constructor () {
    this.stormy = this.getForecast();
  }

  getForecast () {
    if (this._chance() < 0.2) {
      return this._stormy();
    } else {
      return this._fine();
    }
  }

  _chance () {
    return Math.random()
  }

  _stormy () {
    return this.stormy = true;
  }

  _fine () {
    return this.stormy = false;
  }
}

module.exports = Weather