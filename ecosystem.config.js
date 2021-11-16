module.exports = {
  apps : [{
    script: 'dist/index.js',
  }],

  deploy : {
    develop : {
      NODE_ENV: 'develop'
    },
    production : {
      NODE_ENV: 'production'
    }
  }
};
