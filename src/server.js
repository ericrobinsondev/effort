import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import config from './config';
import { connect } from './utils/db';
import { signup, signin, authRequired } from './utils/auth';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', authRequired);
app.post('/signup', signup);
app.post('/signin', signin);

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'));
});

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
