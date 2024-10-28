import request from 'supertest';
import app from '../../../../../app';
// emails-routes.ts tests
describe('emails api endpoints', () => {
    describe('GET /emails', () => {
        it('should return a list of emails', async () => {
            const response = await request(app).get(`/emails`).expect(200).expect('Content-Type', /json/);

            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('from');
            expect(response.body[0]).toHaveProperty('subject');
            expect(response.body[0]).toHaveProperty('body');
            expect(response.body[0]).toHaveProperty('read');
            expect(response.body[0]).toHaveProperty('tags');
            expect(response.body[0]).toHaveProperty('date');
        });
    });

    describe('GET /emails/address', () => {
        it('should return a random email', async () => {
            const response = await request(app).get(`/emails/address`)
                .query({firstName: 'John', lastName: 'Cena'})
                .expect(200).expect('Content-Type', /json/);

            expect(response.body).toContain('john');
            expect(response.body).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
        it('should return 400 error', async () => {
            const response = await request(app).get(`/emails/address`)
                .query({firstName: 'John'})
                .expect(400).expect('Content-Type', /json/);

            expect(response.body).toEqual({"error": "firstName and lastName are required"});
        });
        it('should return 400 error', async () => {
            const response = await request(app).get(`/emails/address`)
                .query({lastName: 'Cena'})
                .expect(400).expect('Content-Type', /json/);

            expect(response.body).toEqual({"error": "firstName and lastName are required"});
        });
        it('should return 400 error', async () => {
            const response = await request(app).get(`/emails/address`)
                .expect(400).expect('Content-Type', /json/);

            expect(response.body).toEqual({"error": "firstName and lastName are required"});
        });
    });
});
