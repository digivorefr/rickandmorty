/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
/* eslint-enable @typescript-eslint/no-var-requires */

const mode = process.env.ENV;
const port = process.env.PORT;
const host = process.env.HOST_IP;

const config = (mode === 'development')
  ? require('./webpack.config-dev')
  : require('./webpack.config-build');

const server = express();
const compiler = webpack(config);

fs.remove(config.output.path)
  .then(() => {
    console.log('MODE', mode);

    // Enable HMR
    if (mode === 'development') {
      const devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: '/assets',
      });
      devMiddleware.waitUntilValid(() => {
        console.log(`\n\x1B[0m\x1B[32m\x1B[1m ✔️ Check your browser : http://${host}:${port} \x1B[0m\n`);
      });
      server.use(devMiddleware);

      server.use(webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 2000,
      }));
    }

    // Launch a webpack compilation
    if (mode === 'production') {
      compiler.run((err, stats) => { // [Stats Object](#stats-object)
      // ...
        if (stats.hasErrors()) {
          console.error(stats.toString(), '\nCompilation failed.');
        }
        console.log(stats.toString(), '\nSuccesfully compiled.');

        compiler.close(() => null);
      });
    }

    // Serves all static assets.
    server.use(express.static(path.resolve(config.output.path, '..')));

    // Catch-all to redirect any request to the main entry point (index.html).
    server.get('*', (_request, response, next) => {
      const filePath = path.resolve('./dist/', 'index.html');
      compiler.outputFileSystem.readFile(filePath, (error, content) => {
        if (error !== null) {
          next(error);
        } else {
          response.set('content-type', 'text/html');
          response.send(content);
          response.end();
        }
      });
    });

    server.listen(port, () => {
      console.log('Server is up, waiting for compilation');
    });
  })
  .catch((error) => {
    console.error('Compilation failed :');
    console.error(error.message);
  });
