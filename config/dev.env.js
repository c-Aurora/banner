'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
    // BASE_API: '"https://mock.mengxuegu.com/mock/642f916f32affa39a121ce38/routing"',
})
