'use strict';

let globalTunnel = require('global-tunnel-ng');

if (process.env.HTTPS_PROXY || process.env.HTTP_PROXY) {
  globalTunnel.initialize({
    host: '10.0.0.10',
    port: 8080,
    proxyAuth: 'userId:password', // optional authentication
    sockets: 50 // optional pool size for each http and https
  });
}
exports.validate = require('./validate');
exports.bundle = require('./bundle');
