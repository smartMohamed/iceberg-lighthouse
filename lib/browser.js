/* npm */
const chromeLauncher = require('chrome-launcher')
const promx = require('promx')
/* local */
const { isDev } = require('./utils')
const logger = require('./logger')

const chromeFlags = isDev() ? ['--show-paint-rects'] : ['--disable-gpu', '--headless', '--no-zygote', '--no-sandbox']

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
    await promx(browser.kill())
    browser = null
  } else {
    logger.info(`browser: chrome is already dead`)
  }
}

module.exports = {
  getBrowser,
  killBrowser,
}

// async function fn() {
//   const a = await getBrowser()
//   const b = await getBrowser()
//   const c = await getBrowser()
//   const d = await getBrowser()

//   console.log('a', a.pid)
//   console.log('b', b.pid)
//   console.log('c', c.pid)
//   console.log('d', d.pid)
// }
// fn()
