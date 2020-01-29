'use strict';

const file = require('./file');
const util = require('util');
const events = require('./event');
const net = require('net');
require('./logger');


const directory = `${__dirname}/${process.argv[2]}`;

const readfilePromise = util.promisify(file.read);
const saveFilePromise = util.promisify(file.save);

const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('Created app.js socket'));



getFile(directory).then(results => {
  writeFile(results, directory).catch(err => events.emit('error', err));
});

/**
 *
 * @param {*} directory
 * @returns results
 */
function getFile(directory) {
  return readfilePromise(directory)
    .then(results => {
      
      return results.toUpperCase();
    })
    .catch(err => events.emit('error', err));
}
/**
 *
 * @param {*} data
 * @param {*} directory
 */
function writeFile(data, directory) {  
  return saveFilePromise(data, directory).then(results => {
    
  });
}


