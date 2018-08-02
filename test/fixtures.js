global.window = global;
global.assert = require('chai').assert;

require('../src/data');
require('./data.spec.js');
require('mockfirebase');
