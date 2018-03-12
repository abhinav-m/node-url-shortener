const env = process.env.NODE_ENV || 'development';

if (env === 'test' || env === 'development') {
  const config = require('./config/config.json');
  const envConfig = config[env];
  // Set global environment variables.
  envConfig.forEach(key => {
    process.env[key] = envConfig[key];
  });
}
