import { newToken, verifyToken, signup, signin, authRequired } from '../auth';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from '../../resources/user/user.model';

describe('Authentication:', () => {
  describe('newToken', () => {
    test('creates new jwt from user', () => {
      const id = 123;
      const token = newToken({ id });
      const user = jwt.verify(token, config.secrets.jwt);

      expect(user.id).toBe(id);
    });
  });

  describe('verifyToken', () => {
    test('validates jwt and returns payload', async () => {
      const id = 123;
      const token = jwt.sign({ id }, config.secrets.jwt);
      const user = await verifyToken(token);
      expect(user.id).toBe(id);
    });
  });

  describe('signup', () => {
    test('requires email and password', async () => {
      expect.assertions(2);

      const req = { body: {} };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        }
      };

      await signup(req, res);
    });

    test('creates user and sends new token from user', async () => {
      expect.assertions(2);
      const userEmail = 'user@domain.com';
      const req = {
        body: {
          email: userEmail,
          password: 'simplepassword',
          firstName: 'firstName',
          lastName: 'lastName'
        }
      };
      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        async send(result) {
          let user = await verifyToken(result.token);
          user = await User.findById(user.id)
            .lean()
            .exec();
          expect(user.email).toBe(userEmail);
        }
      };

      await signup(req, res);
    });
  });

  describe('signin', () => {
    test('requires email and password', async () => {
      expect.assertions(2);

      const req = { body: {} };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        }
      };

      await signin(req, res);
    });

    test('user must be real', async () => {
      expect.assertions(2);

      const req = { body: { email: 'test@test.com', password: 'mypassword' } };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        }
      };

      await signin(req, res);
    });

    test('passwords must match', async () => {
      expect.assertions(2);

      await User.create({
        email: 'test@test.com',
        password: 'right-password',
        firstName: 'firstName',
        lastName: 'lastName'
      });

      const req = {
        body: { email: 'test@test.com', password: 'wrong-password' }
      };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        }
      };

      await signin(req, res);
    });

    test('creates new token', async () => {
      expect.assertions(2);
      const fields = {
        email: 'test@test.com',
        password: 'nodejs',
        firstName: 'firstName',
        lastName: 'lastName'
      };

      const savedUser = await User.create(fields);

      const req = { body: fields };
      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        async send(result) {
          let user = await verifyToken(result.token);
          user = await User.findById(user.id)
            .lean()
            .exec();
          expect(user._id.toString()).toBe(savedUser._id.toString());
        }
      };

      await signin(req, res);
    });
  });

  describe('authRequired', () => {
    test('looks for Bearer token in headers', async () => {
      expect.assertions(2);

      const req = { headers: {} };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await authRequired(req, res);
    });

    test('token must have correct prefix', async () => {
      expect.assertions(2);

      const req = { headers: { authorization: newToken({ id: 'isabella' }) } };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await authRequired(req, res);
    });

    test('must be a real user', async () => {
      const token = `Bearer ${newToken({ id: mongoose.Types.ObjectId() })}`;
      const req = { headers: { authorization: token } };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await authRequired(req, res);
    });

    test('finds user from token and passes on', async () => {
      const user = await User.create({
        email: 'test@test.com',
        password: 'anna',
        firstName: 'firstName',
        lastName: 'lastName'
      });

      const token = `Bearer ${newToken(user)}`;
      const req = { headers: { authorization: token } };

      const next = () => {};
      await authRequired(req, {}, next);
      expect(req.user._id.toString()).toBe(user._id.toString());
      expect(req.user).not.toHaveProperty('password');
    });
  });
});
