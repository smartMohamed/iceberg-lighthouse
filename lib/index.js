/* npm */
const { CronJob } = require('cron')
/* local */
const audit = require('./audit')
const filterResults = require('./filter-results')
const logger = require('./logger')
const queue = require('./queue')
const { createReportAndSave } = require('./report')
const { init, writeData } = require('./influx')
const { killBrowser } = require('./browser')
const { env, bus } = require('./utils')

const { urls, cron } = require('../config')

const queueAuditUrl = (...args) => queue.add(() => auditUrl(...args))

async function auditUrl(url, { config, report } = {}) {
  const { lhr: result } = await audit(url, undefined, config)
  const filtred = filterResults(result, url)
  await writeData(url, filtred)
  if (report) await createReportAndSave(url, result)
}

async function auditAllUrls() {
  for (const { url, plugins } of urls) {
    const plugin = plugins.find((i = {}) => i.name === 'lighthouse')
    if (!plugin) return logger.info(`runner: skipping ${url}`)
    queueAuditUrl(url, plugin)
  }
}

async function main() {
  await init()
  if (cron) return new CronJob(cron, auditAllUrls, null, true, 'Europe/Berlin', null, true)

  await auditAllUrls()
  await killBrowser()
}

/* main */

logger.info(`env: ${JSON.stringify(env, null, 2)}`)

main()
  .then(() => {})
  .catch(err => {
    logger.error(err)
    process.exit(1)
  })

bus.on('audit:url', queueAuditUrl)

module.exports = require('./server')
