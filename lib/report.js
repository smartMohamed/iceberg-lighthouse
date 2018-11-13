/* npm */
const fs = require('fs-extra')
const { generateReportHtml } = require('lighthouse/lighthouse-core/report/report-generator')
/* local */
const { toVolume } = require('./utils')
const logger = require('./logger')

function createReport(url, result) {
  logger.info(`Creating report for ${url}`)
  return generateReportHtml(result)
}

async function saveReport(url, report) {
  logger.info(`Saving report for ${url}`)
  const folder = url.replace(/(^\w+:|^)\/\//, '')
  const filename = `${new Date().toISOString()}.html`
  const filepath = toVolume(`reports/${folder}/${filename}`)
  return fs.outputFile(filepath, report)
}

async function createReportAndSave(url, result) {
  const report = createReport(url, result)
  await saveReport(url, report)
  logger.info(`Report for ${url} is Saved`)
}

module.exports = {
  createReport,
  saveReport,
  createReportAndSave,
}
