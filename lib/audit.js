/* npm */
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const promx = require('promx')
/* local */
const { isDev } = require('./utils')
const logger = require('./logger')
logger.info(`DEV_MODE ${isDev()}`)
const chromeFlags = isDev() ? ['--show-paint-rects'] : ['--disable-gpu', '--headless', '--no-zygote', '--no-sandbox']

async function launchChromeAndRunLighthouse(url, opts = {}, config = null) {
  logger.info(`launching chrome`)
  const [chromeErr, chrome] = await promx(chromeLauncher.launch({ chromeFlags }))
  if (chromeErr) throw chromeErr

  logger.info(`aditing url: ${url}`)
  Object.assign(opts, { port: chrome.port, output: 'json' })
  const [lhError, result] = await promx(lighthouse(url, opts, config))
  if (lhError) throw lhError //new Error(`lighthouse error`)

  logger.info(`killing chrome`)
  await chrome.kill()
  return result //.lhr

  // use results.lhr for the JS-consumeable output
  // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
  // use results.report for the HTML/JSON/CSV output as a string
  // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
}

module.exports = launchChromeAndRunLighthouse
