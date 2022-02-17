const app = require('../app');
const supertest = require("supertest");

describe('Test suite de api v1 pacientes endpoint', () => {
    beforeAll((done) => {

    });
    it("GET /api/v1/pacientes", async () => {
        await supertest(app).get('/api/v1/pacientes')
            .set({apitoken:''})
            .expect(200)
    });
});