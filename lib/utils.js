const path = require('path')
const EventEmitter = require('events')

module.exports = {
  env: {
    get isDEv() {
      return ['developmet', 'dev'].includes(process.env.NODE_ENV)
    },
    isTest: process.env.NODE_ENV === 'test',
    isGUI: !!process.env.GUI,
    influxHost: process.env.HOST || 'localhost',
  },
  toVolume(pth = '') {
    return path.resolve(__dirname, `../volume`, pth)
  },
  bus: new EventEmitter(),
}
