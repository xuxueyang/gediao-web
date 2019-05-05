'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./local.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  // BASE_API: '"http://193.112.17.169:9999"'
  BASE_API: '"http://118.25.103.215:9999"'
})
