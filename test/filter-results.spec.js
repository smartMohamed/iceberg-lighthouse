const mockData = require('../__mocksData__/lighthouse-test-data.json')
const filterResults = require('../lib/filter-results')

describe('filter-results', () => {
  it('returns filtered data when successfully getting data from lighthouse', () => {
    const filteredData = filterResults(mockData.lhr)
    expect(filteredData).toEqual({
      'performance-score': 100,
      'pwa-score': 50,
      'accessibility-score': 88,
      'best-practices-score': 100,
      'seo-score': 89,
      firstContentfulPaint: 780,
      firstMeaningfulPaint: 823,
      firstCPUIdle: 866,
      interactive: 866,
      speedIndex: 903,
      estimatedInputLatency: 13,
      'errors-in-console': 0,
      'time-to-first-byte': 104.07399999999998,
      interactive: 866,
      redirects: 0,
    })
  })

  it('returns empty filtered data when no data passed', () => {
    const filteredData = filterResults()
    expect(filteredData).toEqual({})
  })
})
