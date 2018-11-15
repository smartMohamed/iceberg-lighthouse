/* npm */
const { InfluxDB } = require('influx')
const promx = require('promx')
/* local */
const { env } = require('./utils')
const logger = require('./logger')

const influx = new InfluxDB({
  host: env.influxHost,
  database: 'lighthouse',
})

async function init() {
  logger.info('init influxdb')

  const [err, names] = await promx(influx.getDatabaseNames())
  if (err) {
    logger.error('influx: failed to getDatabaseNames')
    throw err
  }

  if (names.includes('lighthouse')) {
    logger.info('influx: lighthouse database already exist')
    return
  }

  logger.info('influx: Creating lighthouse database')
  const [errCreatingDatabase] = await promx(influx.createDatabase('lighthouse'))
  if (errCreatingDatabase) {
    logger.error('influx: failed to create lighthouse database')
    throw errCreatingDatabase
  }
}

async function writeData(url, data) {
  logger.info(`influx: writing data of ${url}`)

  const points = getPointsFromData(url, data)
  const [err, ok] = await promx(influx.writePoints(points))
  if (err) {
    logger.error(`influx: failed to save points for ${url}`, err)
    throw err
  }
  return ok
}

function getPointsFromData(url = '', data = {}) {
  return Object.entries(data).reduce((points, [measurement, value]) => {
    if (value === undefined) return points
    return [
      ...points,
      {
        measurement,
        tags: { url },
        fields: { value },
      },
    ]
  }, [])
}

module.exports = {
  init,
  writeData,
  getPointsFromData,
}

// console.log(getPoints('tada', { firstname: 'bob', lastname: 'bob' }))
