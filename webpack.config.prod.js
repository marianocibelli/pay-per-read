const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: './app/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'build/statics'),
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
      },
      {
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        })
      }
    ]
  },
  plugins: [
      new ExtractTextPlugin({
        filename: "[name].css",
        allChunks: true,
        disable: false
      }),
      new AssetsPlugin({path: path.join(__dirname, 'build/statics')}),
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.DefinePlugin({
          'process.env.AUTH0_CALLBACK': JSON.stringify(process.env.AUTH0_CALLBACK),
      }),
      new webpack.optimize.CommonsChunkPlugin({
          name: ['vendor', 'manifest']
      }),
      new webpack.DefinePlugin({
        "process.env": {
            BROWSER: JSON.stringify(true)
        }
      }),
      new OptimizeCssAssetsPlugin(),
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
