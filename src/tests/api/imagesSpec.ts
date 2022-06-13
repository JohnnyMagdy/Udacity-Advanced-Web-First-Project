import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('gets the api/images endpoint with corresponding data', async () => {
    const fileName = 'palmtunnel';
    const width = 200;
    const height = 200;

    const response = await request.get(
      `/api/images?filename=${fileName}&width=${width}&height=${height}`
    );

    expect(response.status).toBe(200);
  });
});
