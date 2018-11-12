module.exports = {
  notify: true,
  verbose: true,
  transform: { "^.+\\.js$": `babel-jest` },
  // collectCoverage: false,
  // coverageReporters: [`json-summary`, `text`, `html`],
  // coverageThreshold: {
  //   global: {
  //     lines: 45,
  //     statements: 44,
  //     functions: 42,
  //     branches: 43,
  //   },
  // },
}