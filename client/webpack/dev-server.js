const {
  IS_PRODUCTION,
  paths,
  stats,
} = require('./config');

const devServer = {
  contentBase: IS_PRODUCTION ? paths.build : paths.source,
  historyApiFallback: true,
  compress: IS_PRODUCTION,
  inline: !IS_PRODUCTION, // Change to false for IE10 dev mode
  hot: !IS_PRODUCTION,
  host: '0.0.0.0',
  disableHostCheck: true, // To enable local network testing
  overlay: true,
  stats,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:19001',
      secure: false
    },
    // '/api/**': 'http://127.0.0.1:19001',
    // '/api/': 'http://127.0.0.1:19001',
    // '/imagesapi/': 'http://127.0.0.1:19001'
    // '/api/**': 'http://198.199.115.67:19001',
    // '/api/': 'http://198.199.115.67:19001',
    // '/imagesapi/': 'http://198.199.115.67:19001'
  }
};

module.exports = {
  devServer,
};
