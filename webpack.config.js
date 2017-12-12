var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'react'
          ]
        }
      }
    ]
  },
  plugins: [
    new AssetsPlugin({path: path.join(__dirname, 'build')})
  ]
};
