const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const wbpckConfig = require('./webpack.config.js');
const PATHS = require('./paths');
const config = require('./src/config');

const isDeveloping = (process.env.NODE_ENV !== 'production');
const { port } = config;

const app = express();

const proxy = httpProxy.createProxyServer();

const proxyTo = (origin) => {
  return (req, res) => {
    const trimmedUrl = req.originalUrl.replace('/api', '');
    console.log(`trimming ${req.url} to ${trimmedUrl} and passing to ${origin}`);
    req.url = trimmedUrl;
    return proxy.web(req, res, {
      target: origin
    });
  };
};

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
  app.all('/api/*', proxyTo(config.url));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(PATHS.build, 'index.html')));
    res.end();
  });

} else {

  app.use(express.static(PATHS.build));
  app.all('/api/*', proxyTo(config.url));
  app.get('*', function response(req, res) {
    console.log('CAUGHT RETURNING INDEX');
    res.sendFile(path.join(PATHS.build, 'index.html'));
  });

}

proxy.on('error', function (err, req, res) {
  console.log('PROXY ERROR');
  res.sendStatus(500);
});

app.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
