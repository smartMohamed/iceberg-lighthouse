const rawDataMock = require('../__mocksData__/lighthouse-raw-data.json')
const filtrtedDataMock = require('../__mocksData__/lighthouse-filtred-data.json')

const filterResults = require('../lib/filter-results')

describe('filter-results', () => {
  it('returns filtered data when successfully getting data from lighthouse', () => {
    const filteredData = filterResults(rawDataMock.lhr)
    expect(filteredData).toEqual(filtrtedDataMock)
  })

  it('returns empty filtered data when no data passed', () => {
    const filteredData = filterResults()
    expect(filteredData).toEqual({})
  })
})
