/* npm */
const fs = require('fs-extra')
const promx = require('promx')
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
  const [err] = await promx(fs.outputFile(filepath, report))
  if (err) logger.error(`report: Couldn't save report in ${filepath}`, err)
  else logger.info(`report: Saved in ${filepath}`)
}

async function createReportAndSave(url, result) {
  const report = createReport(url, result)
  await saveReport(url, report)
}

module.exports = {
  createReport,
  saveReport,
  createReportAndSave,
}
