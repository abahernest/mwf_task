import request from "supertest";

import sequelize from '../../src/config/database.config';
import app from "../../src/app";
import assert  from "assert";


describe('Auth', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(() => sequelize.sync({ force: true }));
  
    test('Should return 412 for invalid email', async () => {
        const result = await request(app)
        .post('/api/v1/signup')
        .send({email: "sample.email.com", fullname: "sample user", password: "P@ssw0rd"})
        
        expect(result.statusCode).toEqual(412)
        expect(result.body.data.message).toEqual("email must be a valid email");
    })

    test('Should return 412 for invalid password', async () => {
        const result = await request(app)
        .post('/api/v1/signup')
        .send({email: "sample@email.com", fullname: "sample user", password: "Password"})
        
        expect(result.statusCode).toEqual(412)
        expect(result.body.data.message).toEqual("Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character");
    })

    test('Should return 200 for correct credentials', async () => {
        const result = await request(app)
        .post('/api/v1/signup')
        .send({email: "SAMPLE@email.com", fullname: "sample user", password: "P@ssw0rd"})
        
        expect(result.statusCode).toEqual(200)
        expect(result.body.data.user.fullname).toEqual("sample user");
        expect(result.body.data.user.email).toEqual("sample@email.com");
    })

    test('Should return 400 if email already exist', async () => {
        const result = await request(app)
        .post('/api/v1/signup')
        .send({email: "sample@email.com", fullname: "sample user", password: "P@ssw0rd"})
        
        expect(result.statusCode).toEqual(400)
        expect(result.body.data.message).toEqual("User already exists");
    })

});
