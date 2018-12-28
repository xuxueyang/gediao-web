'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./local.env')


module.exports = merge(prodEnv, {
  NODE_ENV: 'local',
  BASE_API: 'http://localhost:9999',
  // GEDIAO_WS_API: '"ws://localhost:9999/websocket"',
})
