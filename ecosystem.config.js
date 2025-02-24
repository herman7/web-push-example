module.exports = {
  apps: [
    {
      name: 'web-push-example',
      script: './index.js',
      watch: false,
      force: true,
      env: {
        PORT: 5004,
        NODE_ENV: 'production',
      },
    },
  ],
};