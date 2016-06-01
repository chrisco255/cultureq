// var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./webpack.parts');
const pkg = require('./package.json');

const PATHS = {
  app: path.join(__dirname, 'src'),
  style: [
    // path.join(__dirname, 'node_modules', 'purecss'),
    path.join(__dirname, 'src', 'main.css')
  ],
  build: path.join(__dirname, 'dist')
};

const common = {
	devtool: 'source-map',
  entry: {
    style: PATHS.style
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
	resolve: {
	  extensions: ['', '.js', '.jsx']
	},
  plugins: [
    new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(PATHS.app, 'index.html')
    })
  ]
};

var config;

var TARGET = process.env.npm_lifecycle_event;


// Detect how npm is run and branch based on that
switch( TARGET ) {
  case 'build':
    config = merge(
      common,
      {
				entry: {
					app: PATHS.app
				},
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable( 'process.env.NODE_ENV', 'production' ),
			parts.setupJSProd(PATHS.app),
      parts.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.dependencies)
      }),
			parts.extractCSS(PATHS.style),
      parts.minify(),
      parts.purifyCSS([PATHS.app])
    );
    break;
  default:
    config = merge(
      common,
			{
				entry: {
					app: [
          	'webpack-dev-server/client?http://0.0.0.0:8080',
      			'webpack/hot/only-dev-server',
          	PATHS.app
        	]
				},
			},
			parts.setupJSDev(PATHS.app),
      parts.setupCSS(PATHS.app),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);
