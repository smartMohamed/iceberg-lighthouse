/* npm */
const chromeLauncher = require('chrome-launcher')
const promx = require('promx')
/* local */
const { env } = require('./utils')
const logger = require('./logger')

const chromeFlags = env.isGUI ? ['--show-paint-rects'] : ['--disable-gpu', '--headless', '--no-zygote', '--no-sandbox']

let browser, pending

async function getBrowser() {
  if (browser) return browser
  if (pending) return pending
  logger.info(`browser: launching chrome`)
  pending = chromeLauncher.launch({ chromeFlags })
  const [chromeErr, chrome] = await promx(pending)
  if (chromeErr) throw chromeErr
  browser = chrome
  pending = null
  return browser
}

async function killBrowser() {
  if (browser && browser.kill) {
    logger.info(`browser: killing chrome`)
    const [err] = await promx(browser.kill())
    if (err) process.exit(2)
    browser = null
  } else {
    logger.info(`browser: chrome is already dead`)
  }
}

module.exports = {
  getBrowser,
  killBrowser,
}
