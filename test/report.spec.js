// start mocks
const fs = require('fs-extra')
const { generateReportHtml } = require('lighthouse/lighthouse-core/report/report-generator')
jest.mock('lighthouse/lighthouse-core/report/report-generator', () => ({
  generateReportHtml: jest.fn(() => 'mocked_html_report'),
}))
jest.mock('fs-extra', () => ({
  outputFile: jest.fn(),
}))
// end mocks

const { createReport, saveReport, createReportAndSave } = require('../lib/report')

describe('report', () => {
  const url = 'http://example.com/shop/product?item=1'
  const expectedUrlRegx = /example\.com\/shop\/product\?item=1/

  beforeEach(() => {
    generateReportHtml.mockClear()
    fs.outputFile.mockClear()
  })

  describe('report| createReport', () => {
    it('should call generateReportHtml correctly', () => {
      createReport(url, 'audit_result')
      expect(generateReportHtml).toBeCalledWith('audit_result')
    })
  })

  describe('report| saveReport', () => {
    it('should call fs.outputFile correctly', () => {
      saveReport(url, 'html_report')
      expect(fs.outputFile).toBeCalledWith(expect.stringMatching(expectedUrlRegx), 'html_report')
    })
  })

  describe('report| createReportAndSave', () => {
    it('should call fs.outputFile correctly', () => {
      createReportAndSave(url, 'audit_result')
      expect(fs.outputFile).toBeCalledWith(expect.stringMatching(expectedUrlRegx), 'mocked_html_report')
    })
  })
})
