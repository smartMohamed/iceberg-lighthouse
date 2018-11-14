// start mocks
// const { InfluxDB } = require('influx')

// jest.mock('influx', () => ({
//   InfluxDB: jest.fn(() => 'mocked_html_report'),
// }))
// end mocks

const { getPointsFromData } = require('../lib/influx')
describe('influx', () => {
  // beforeEach(() => {
  //   InfluxDB.mockClear()
  // })

  describe('influx | getPointsFromData', () => {
    it('should return a valid inlux points', async () => {
      const points = getPointsFromData('https://www.example.com', { interactive: 866, speedIndex: 903 })
      const expectedPoints = [
        {
          measurement: 'interactive',
          tags: {
            url: 'https://www.example.com',
          },
          fields: {
            value: 866,
          },
        },
        {
          measurement: 'speedIndex',
          tags: {
            url: 'https://www.example.com',
          },
          fields: {
            value: 903,
          },
        },
      ]
      expect(points).toEqual(expectedPoints)
    })
  })
})
