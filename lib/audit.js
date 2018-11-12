/* npm */
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const promx = require('promx')
/* local */
const { isDev } = require('./utils')

const chromeFlags = isDev() ? ['--show-paint-rects'] : ['--disable-gpu', '--headless', '--no-zygote', '--no-sandbox']

async function launchChromeAndRunLighthouse(url, opts = {}, config = null) {
  const [chromeErr, chrome] = await promx(chromeLauncher.launch({ chromeFlags }))
  if (chromeErr) throw chromeErr //new Error(`couldn't launch chrome`)
  console.log('>>chrome ', chrome)
  Object.assign(opts, { port: chrome.port, output: 'json' })
  const [lhError, result] = await promx(lighthouse(url, opts, config))
  if (lhError) throw lhError //new Error(`lighthouse error`)

  await chrome.kill()
  return result //.lhr

  // use results.lhr for the JS-consumeable output
  // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
  // use results.report for the HTML/JSON/CSV output as a string
  // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
}

console.log('NODE_ENV', isDev())

module.exports = launchChromeAndRunLighthouse
