/* npm */
const chromeLauncher = require('chrome-launcher')
const promx = require('promx')
/* local */
const { env } = require('./utils')
const logger = require('./logger')

const chromeFlags = env.isGUI ? ['--show-paint-rects'] : ['--disable-gpu', '--headless', '--no-zygote', '--no-sandbox']
const maxConnectionRetries = 10

// let browser, pending

async function getBrowser() {
  // if (browser) return browser
  // if (pending) return pending
  logger.info(`browser: launching chrome`)
  let pending = chromeLauncher.launch({ chromeFlags, maxConnectionRetries })
  const [chromeErr, chrome] = await promx(pending)
  if (chromeErr) throw chromeErr
  pending = null
  return chrome
}

async function killBrowser(browser) {
  if (browser && browser.kill) {
    logger.info(`browser: killing chrome`)
    return browser.kill()
  } else {
    logger.info(`browser: chrome is already dead`)
  }
}

module.exports = {
  getBrowser,
  killBrowser,
}
