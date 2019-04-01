import request from 'supertest';
import {app} from '../server';
import { testNameToKey } from 'jest-snapshot/build/utils';
import { doesNotReject } from 'assert';

describe('Server defaults', () => {
  test('GET / returns 200', async (done) => {
    let response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    done();
  })
})