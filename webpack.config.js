'use strict';
const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const pkg = require('./package.json');

const PATHS = {
  app: path.join(__dirname, 'src'),
  style: [
    // path.join(__dirname, 'node_modules', 'purecss'),
    path.join(__dirname, 'src', 'main.css')
  ],
  build: path.join(__dirname, 'build')
};


// TODO: PREVIOUS entry.app
// entry: {
//   app: [
//     'webpack-dev-server/client?http://0.0.0.0:8080',
//     'webpack/hot/only-dev-server',
//     PATHS.app
//   ]
// },

var config = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      PATHS.app
    ],
    style: PATHS.style
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
    //publicPath: '/' //TODO: IS THIS NECESSARY?
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,

    hot: true,
    inline: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '8080'
  },
  plugins: [
    new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(PATHS.app, 'index.html')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
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
      loaders: ['react-hot', 'babel?cacheDirectory'],
      include: PATHS.app
    }, {
      test: /\.css$/,
      loaders: ['style?sourceMap','css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'autoprefixer?browsers=last 2 versions'],
      include: PATHS.app
    }]
  }
};

module.exports = validate(config);

// parts.extractBundle({
//   name: 'vendor',
//   entries: Object.keys(pkg.dependencies)
// }),
// exports.extractBundle = function(options) {
//   const entry = {};
//   entry[options.name] = options.entries;
//
//   return {
//     // Define an entry point needed for splitting.
//     entry: entry,
//     plugins: [
//       // Extract bundle and manifest files. Manifest is needed for reliable caching.
//       new webpack.optimize.CommonsChunkPlugin({
//         names: [options.name, 'manifest'],
//         minChunks: Infinity
//       })
//     ]
//   };
// }
