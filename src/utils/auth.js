import config from '../config';
import { User } from '../resources/user/user.model';
import jwt from 'jsonwebtoken';

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).send({
      message: 'Email, password, first name, and last name required.'
    });
  }

  try {
    const user = await User.create({ email, password, firstName, lastName });
    const token = newToken(user);

    return res.status(201).send({ token });
  } catch (e) {
    return res.status(500).send({ error: e });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password required.' });
  }

  try {
    const user = await User.findOne({ email }).exec();
    const match = await user.checkPassword(password);

    if (!match) {
      return res.status(401).send({ message: 'Invalid password.' });
    }

    const token = newToken(user);
    return res.status(200).send({ token });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ message: 'User not found.', e });
  }
};

export const authRequired = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).end();

  const token = req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return res.status(401).end();
  }

  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec();

    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).end();
  }
};
