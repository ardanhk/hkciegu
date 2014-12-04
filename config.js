var config = {};

config.MONGODB_URL = 'mongodb://localhost:27017/test';
config.RETRY_INTERVAL = 5000; // 5 secs
config.PORT = 8080;

config.options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'vantis' }
  //user: 'hkciegu',
  //pass: 'vantis'
};

module.exports = config;