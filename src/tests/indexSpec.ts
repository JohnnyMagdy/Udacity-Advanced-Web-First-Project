import supertest from "supertest";
import app from "..";

const request = supertest(app);

describe('Test endpoint responses',()=>{
    it('gets the api end point', async()=>{
        const response = await request.get('/test');
        expect(response.status).toBe(200);
    })
});