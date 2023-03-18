const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // Route to your Django app's API
    createProxyMiddleware({
      target: 'http://127.0.0.1:8000',  // Your Django app's address
      changeOrigin: true,
    })
  );
};