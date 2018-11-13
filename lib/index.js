const audit = require('./audit')
const { createReportAndSave } = require('./report')

const filterResults = require('./filter-results')
const logger = require('./logger')

const url = 'https://www.smartfrog.com/en-gb/shop'

async function main() {
  const { lhr: result } = await audit(url)
  await createReportAndSave(url, result)
}

main()
  .then(() => logger.info('done'))
  .catch(err => logger.error(err))
