/* npm */
const { send, json } = require('micro')
const { router, get, post } = require('microrouter')
const handler = require('serve-handler')
/* local */
const { toVolume, bus } = require('./utils')
const logger = require('./logger')

module.exports = router(
  post('/collect', async (req, res) => {
    const { url, report } = (await json(req)) || {}
    logger.info(`server: collect for url: ${url}`)
    if (!url) return send(res, 400, `url is required, recieved: ${url}`)
    bus.emit('audit:url', url, { report })
    send(res, 200, `${url} will be audited now`)
  }),
  get('/collect', async (req, res) => {
    const { url, report } = req.query
    logger.info(`server: collect for url: ${url}`)
    if (!url) return send(res, 400, `url is required, recieved: ${url}`)
    bus.emit('audit:url', url, { report })
    send(res, 200, `${url} will be audited now`)
  }),
  get('/*', (req, res) =>
    handler(req, res, {
      cleanUrls: true,
      public: toVolume(`reports`),
    })
  )
)
