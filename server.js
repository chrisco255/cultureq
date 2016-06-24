const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const wbpckConfig = require('./webpack.config.js');
const PATHS = require('./paths');
const config = require('./src/config');

const isDeveloping = (process.env.NODE_ENV !== 'production');
const port = config.port;

const app = express();

if (isDeveloping) {
  const compiler = webpack(wbpckConfig);
  const devServer = {
    publicPath: wbpckConfig.output.publicPath,
    contentBase: PATHS.app,
    noInfo: true,
    stats: {
      colors: true,
      timings: true
    }
  };

  const middleware = webpackMiddleware(compiler, devServer);

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(PATHS.build, 'index.html')));
    res.end();
  });


} else {
  // const webSocketProxy = proxy('/', {
  //   target: config.socketUrl,
  //   ws: true,
  //   changeOrigin: true
  // });
  app.use(express.static(PATHS.build));
  // app.use(webSocketProxy);

  app.use('/api/*', proxy({
    target: config.url,
    changeOrigin: true ,
    pathRewrite: { '^/remove/api': '' }
  }));

  app.get('*', function response(req, res) {
    res.sendFile(path.join(PATHS.build, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
