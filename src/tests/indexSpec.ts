import supertest from "supertest";
import app from "..";

const request = supertest(app);

describe('Test endpoint response', () => {
    it('gets the api/images endpoint', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
    });
});