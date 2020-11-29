module.exports = {
  apps : [{
    name: 'kaori-wheel',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    combine_logs: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 8001,
      LANG: 'en',
    }
  }],
  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
