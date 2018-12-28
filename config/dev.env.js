'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./local.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  BASE_API: '"http://193.112.17.169:9999"',
  GEDIAO_WS_API: 'ws://193.112.17.169:9999/websocket'
})
