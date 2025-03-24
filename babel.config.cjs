module.exports = {
    presets: [
      ['@babel/preset-env', {
        targets: {
          node: 'current',
        },
        // Tell Babel to transform ES modules to CommonJS for testing
        modules: 'commonjs'
      }]
    ]
  };