const path = require('path')

module.exports = {
  isDev() {
    return ['developmet', 'dev'].includes(process.env.NODE_ENV)
  },
  toVolume(pth = '') {
    return path.resolve(__dirname, `../volume`, pth)
  },
}
