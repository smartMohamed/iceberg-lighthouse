// start mocks
const chromeLauncher = require('chrome-launcher')

jest.mock('chrome-launcher', () => ({
  launch: jest.fn(() => 'mocked_html_report'),
}))
// end mocks

const { getBrowser } = require('../lib/browser')

describe('browser', () => {
  beforeEach(() => {
    chromeLauncher.launch.mockClear()
  })

  describe('browser| getBrowser', () => {
    chromeLauncher.launch.mockImplementationOnce(() => Promise.resolve({ pid: 1234 }))
    chromeLauncher.launch.mockImplementationOnce(() => Promise.resolve({ pid: 4321 }))
    chromeLauncher.launch.mockImplementationOnce(() => Promise.resolve({ pid: 2134 }))
    chromeLauncher.launch.mockImplementationOnce(() => Promise.resolve({ pid: 3124 }))
    it('should return different browser instances', async () => {
      const a = await getBrowser()
      const b = await getBrowser()
      const c = await getBrowser()
      const d = await getBrowser()
      expect(a).toEqual({ pid: 1234 })
      expect(b).toEqual({ pid: 4321 })
      expect(c).toEqual({ pid: 2134 })
      expect(d).toEqual({ pid: 3124 })
    })
  })
})
