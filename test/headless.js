global.window = global;
global.assert = require('chai').assert;

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
mockdatabase.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  path => (path ? mockdatabase.child(path) : mockdatabase),
  () => mockauth
);

require('../src/validacion');
// require('../src/data');
require('./data.spec.js');
