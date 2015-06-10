'use strict';

var swagger = require('swagger-parser'),
     fs = require('fs'),
   util = require('util'),
  chalk = require('chalk'),
      _ = require('lodash');

module.exports = function dereference(filename, options, cb) {
  var output = [];
  output.push(util.format('Dereferencing file: %s', filename));
  swagger.parse(filename, {external$Refs: options.externalRefs}, function (err, api, metadata) {
    //console.log('filename: %s\noptions: %s', filename, JSON.stringify(_.omit(options, 'parent'), null, 2));
    if (err) {
      return cb(err, output);
    }
    //Check to see if an outputFile was specified, else output to terminal
    if (options.outputFile) {
      output.push(chalk.green('File parsed successfully'));
      output.push(util.format('Writing parsed data to file %s', options.outputFile));
      fs.writeFile(options.outputFile, JSON.stringify(metadata), function (err) {
        if (err) {
          return cb(err, output);
        }
        output.push(chalk.green('Parsed data successfully written to file'));
        cb(null, output);
      });
    }
    else {
      output.push(chalk.green('File parsed successfully'));
      output.push(metadata);
      cb(null, output);
    }
  });
};
