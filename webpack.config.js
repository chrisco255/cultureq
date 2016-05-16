var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080',
		'webpack/hot/only-dev-server',
		'./src/index.js'
	],
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'react-hot!babel'
			}, {
				test: /\.css$/,
				loader: 'style!css!autoprefixer?browsers=last 2 versions'
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
	devServer: {
		historyApiFallback: true,
		contentBase: './dist',
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};