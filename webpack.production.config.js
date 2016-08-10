'use strict';
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
const PATHS = require('./paths');

module.exports = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'cheap-module-source-map'
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(PATHS.app, 'index.html')
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [{
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
      loaders: [
        'transform-loader/cacheable?brfs',
        'transform-loader/cacheable?packageify'
      ]
    }, {
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
      loader: 'transform-loader/cacheable?ejsify'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.js?$/,
      loader: 'babel',
      include: PATHS.app
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style?sourceMap','css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'autoprefixer?browsers=last 2 versions'),
      include: PATHS.app
    },{
      test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
      loader: 'file-loader',
      include: [PATHS.app],
      query: {
        name: 'static/media/[name].[ext]'
      }
    }]
  }
};
