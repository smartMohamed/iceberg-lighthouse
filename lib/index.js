/* npm */
const { CronJob } = require('cron')
/* local */
const audit = require('./audit')
const { createReportAndSave } = require('./report')
const filterResults = require('./filter-results')
const logger = require('./logger')
const { init, writeData } = require('./influx')
const { killBrowser } = require('./browser')
const { env, bus } = require('./utils')

const { urls, cron } = require('../config')

logger.info('env', env)

bus.on('audit:url', auditUrl)

async function auditUrl(url, { config, report } = {}) {
  const { lhr: result } = await audit(url, undefined, config)
  const filtred = filterResults(result, url)
  await writeData(url, filtred)
  if (report) await createReportAndSave(url, result)
}

async function auditAllUrls() {
  for (const { url, plugins } of urls) {
    const plugin = plugins.find((i = {}) => i.name === 'lighthouse')
    if (!plugin) return logger.info(`skipping ${url}`)
    await auditUrl(url, plugin)
    logger.info(`done with ${url}`)
  }
}

async function main() {
  await init()
  if (cron) return new CronJob(cron, auditAllUrls, null, true, 'Europe/Berlin', null, true)

  await auditAllUrls()
  await killBrowser()
}

main()
  .then(_ => logger.info('done'))
  .catch(err => logger.error(err))

module.exports = require('./server')
