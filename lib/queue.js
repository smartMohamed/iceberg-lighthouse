/* npm */
const PQueue = require('p-queue')
/* local */
const logger = require('./logger')

const queue = new PQueue({ concurrency: 1 })

let wip = false

function checkQueue() {
  if (wip) return
  wip = true
  queue.onIdle().then(() => {
    logger.info(`queue: all tasks are done`)
    wip = false
  })
}

module.exports = {
  add(task) {
    queue.add(task)
    checkQueue()
    logger.info(`queue: ${queue.pending} pending & ${queue.size} to finish`)
  },
}
