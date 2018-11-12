module.exports = {
  isDev() {
    return ['developmet', 'dev'].includes(process.env.NODE_ENV)
  },
}
