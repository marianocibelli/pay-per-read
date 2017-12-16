const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    main: './app/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
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
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
      new AssetsPlugin({path: path.join(__dirname, 'build')}),
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.DefinePlugin({
          'process.env.AUTH0_CALLBACK': JSON.stringify(process.env.AUTH0_CALLBACK),
      }),
      new webpack.optimize.CommonsChunkPlugin({
          name: ['vendor', 'manifest']
      }),
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          comments: false,
          compress: {
              screw_ie8: true,
              warnings: false
          },
          mangle: {
              screw_ie8: true
          },
          output: {
              comments: false,
              screw_ie8: true
          }
      })
  ]
};
