/* npm */
const lighthouse = require('lighthouse')
const promx = require('promx')
/* local */
const { getBrowser } = require('./browser')
const logger = require('./logger')

const defaultLighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    maxWaitForLoad: 10000
  }
}

async function audit(url, browser, userOpts = {}, userConfig) {
  logger.info(`audit: start auditing url > ${url}`)
  // Object.assign(opts, { port: chrome.port, output: 'json', logLevel: 'info' })

  const opts = { port: browser.port, output: 'json', ...userOpts }
  const config = { ...defaultLighthouseConfig, ...userConfig }
  const [lhError, result] = await promx(lighthouse(url, opts, config), {timeout: 80000})
  if (lhError) throw lhError //new Error(`lighthouse error`)

  // logger.info(`killing chrome`)
  // await chrome.kill()
  logger.info(`audit: done with url > ${url}`)

  return result //.lhr

  // use results.lhr for the JS-consumeable output
  // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
  // use results.report for the HTML/JSON/CSV output as a string
  // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
}

module.exports = audit
