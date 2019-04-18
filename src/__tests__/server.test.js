import request from 'supertest';
import { app } from '../server';
import { testNameToKey } from 'jest-snapshot/build/utils';
import { doesNotReject } from 'assert';

describe('Server defaults', () => {
  test('GET /api returns 401', async done => {
    let response = await request(app).get('/api');
    expect(response.statusCode).toBe(401);
    done();
  });
});
