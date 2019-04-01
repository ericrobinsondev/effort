"use strict";

var _user = require("../user.model");

describe('User model', () => {
  describe('schema', () => {
    test('email', () => {
      const email = _user.User.schema.obj.email;
      expect(email).toEqual({
        type: String,
        required: true,
        unique: true,
        trim: true
      });
    });
    test('password', () => {
      const password = _user.User.schema.obj.password;
      expect(password).toEqual({
        type: String,
        required: true
      });
    });
  });
});