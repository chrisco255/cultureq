'use strict';
const path = require('path');

module.exports = {
  app: path.join(__dirname, 'src'),
  style: [
    // path.join(__dirname, 'node_modules', 'purecss'),
    path.join(__dirname, 'src', 'main.css')
  ],
  build: path.join(__dirname, 'build')
}
