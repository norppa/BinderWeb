const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
    output: {
        publicPath: '/'

    },
    mode: 'development',
    devServer: {
        historyApiFallback: true
    },
})