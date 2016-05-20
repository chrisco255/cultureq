if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.component.prod.js');
} else {
  module.exports = require('./Root.component.dev.js');
}
