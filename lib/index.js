const launchChromeAndRunLighthouse = require('./audit')

launchChromeAndRunLighthouse('https://www.smartfrog.com/en-gb/shop')
  .then(results => {
    console.log('result', results.report)
  })
  .catch(err => {
    console.log('error>>, ', err)
  })
