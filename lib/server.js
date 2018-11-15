const http = require('http')
/* npm */
const handler = require('serve-handler')
/* local */
const { toVolume } = require('./utils')

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, {
    cleanUrls: true,
    public: toVolume(`reports`),
  })
})

server.listen(3000, () => {
  console.log('Running at http://localhost:3000')
})
