const _get = require('lodash/get')

function parseCategories(categories = {}) {
  return Object.values(categories).reduce((acc, category) => {
    acc[`${category.id}-score`] = Math.round(category.score * 100)
    return acc
  }, {})
}

function parseMetrics(metrics = {}) {
  return Object.entries(metrics)
    .filter(([key]) => !key.includes('observed'))
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
}

function parseAudits(audits = {}) {
  const auditData = ['errors-in-console', 'time-to-first-byte', 'interactive', 'redirects']
  return auditData.reduce((acc, key) => {
    const { rawValue } = audits[key] || {}
    if (rawValue !== undefined) acc[key] = rawValue
    return acc
  }, {})
}

function filterResults(data = {}) {
  const { categories = {}, audits = {} } = data
  const metricItems = _get(audits, 'metrics.details.items[0]')
  return {
    ...parseCategories(categories),
    ...parseMetrics(metricItems),
    ...parseAudits(audits),
  }
}

module.exports = filterResults
