"use strict";

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

var _server = require("../server");

var _utils = require("jest-snapshot/build/utils");

var _assert = require("assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Server defaults', () => {
  test('GET / returns 200', async done => {
    let response = await (0, _supertest2.default)(_server.app).get('/');
    expect(response.statusCode).toBe(200);
    done();
  });
});