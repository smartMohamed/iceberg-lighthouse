const audit = require('./audit')
const { createReportAndSave } = require('./report')
const filterResults = require('./filter-results')
const logger = require('./logger')

const { urls, cron } = require('../config')

const url = 'https://www.smartfrog.com/en-gb/shop'

async function auditUrl(url, { config, report } = {}) {
  const { lhr: result } = await audit(url, undefined, config)
  if (report) await createReportAndSave(url, result)
  return filterResults(result)
}

async function auditAllUrls() {
  for (const { url, plugins } of urls) {
    const plugin = plugins.find((i = {}) => i.name === 'lighthouse') || {}
    await auditUrl(url, plugin)
    logger.info(`done with ${url}`)
  }
}

auditAllUrls()
  .then(res => logger.info('done', res))
  .catch(err => logger.error(err))
