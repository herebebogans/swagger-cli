'use strict';

let globalTunnel = require('global-tunnel-ng');
const url = require('url');

if ((process.env.HTTPS_PROXY || process.env.HTTP_PROXY) && !process.env.LOCAL) {

  const proxy = url.parse(process.env.HTTPS_PROXY || process.env.HTTP_PROXY);
  globalTunnel.initialize({
    host: proxy.host,
    port: proxy.port,
    sockets: 50 // optional pool size for each http and https
  });
}
exports.validate = require('./validate');
exports.bundle = require('./bundle');
