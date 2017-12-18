const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'inline-source-map',
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'build/statics'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        })
      },
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
    new AssetsPlugin({path: path.join(__dirname, 'build/statics')}),
    new ExtractTextPlugin({
			filename: "[name].css",
      allChunks: true,
      disable: false
		}),
    new webpack.DefinePlugin({
        'process.env.AUTH0_CALLBACK': JSON.stringify(process.env.AUTH0_CALLBACK),
    }),
    new webpack.DefinePlugin({
        "process.env": {
            BROWSER: JSON.stringify(true)
        }
    })
  ]
};
