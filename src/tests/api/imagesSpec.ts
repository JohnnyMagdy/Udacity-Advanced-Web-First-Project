import supertest from "supertest"
import images from "../../routes/api/images"

const request = supertest(images);

describe('Test endpoint response', ()=>{
    it('gets the api/images endpoint', async (done)=>{
        const fileName = 'palmtunnel';
        const width = 200;
        const height = 200;

        const response = await request.get(`/api/images?filename=${fileName}&width=${width}&height=${height}`)

        expect(response.status).toBe(200);

        done();
    })
})