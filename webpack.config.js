const app_root = 'src'
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const dotenv = require('dotenv-webpack')
const dotenv4Webpack = require('dotenv')
dotenv4Webpack.config({
    silent: true
})


module.exports = {
  app_root: app_root, // the app root folder, needed by the other webpack configs
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    `webpack-dev-server/client?http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    __dirname + '/' + app_root + '/index.js',
  ],
  output: {
    path: __dirname + '/public/js',
    publicPath: 'js/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      }
    ],
  },
  devServer: {
    contentBase: __dirname + '/public',
    compress: true,
    // host: 'localhost',
    // port: '8081',
    host: process.env.CLIENT_HOST,
    port: process.env.CLIENT_PORT,
  },
  plugins: [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
      root: __dirname + '/public',
      verbose: true,
      dry: false, // true for simulation
    }),
    new dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
  ],
  node: {
    // console: true,
    // fs: 'empty',
    // net: 'empty',
    // tls: 'empty',
  }
}
