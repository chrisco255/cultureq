var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'./src/index.js'
	],
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loaders: ['babel']
			}, {
				test: /\.css/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('style?sourceMap','css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'autoprefixer?browsers=last 2 versions')
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('style.css', { allChunks: true })
	]
};