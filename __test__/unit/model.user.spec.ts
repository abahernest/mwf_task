import sequelize from "../../src/config/database.config";

import User from "../../src/models/user.model";
    

describe('User Model: ', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  
  afterAll(() => sequelize.sync({ force: true }));

  describe('CRUD', () => {
    describe('Create', () => {
      test('should create a user data object', async () => {
        const result = await User.create({
          email: "sample@email.com",
          fullname: "sample user",
          password: "sample password"
        });
        expect(result.dataValues.email).toEqual("sample@email.com");
        expect(result.dataValues.fullname).toEqual("sample user");
      });
    });

    describe('Read: ', () => {
      test('should get a user object by email', async() =>{
        const result = await User.findOne({where:{email: "sample@email.com"}});

        expect(result.dataValues.email).toEqual("sample@email.com");
        expect(result.dataValues.fullname).toEqual("sample user");
      })
    });

  });
})
  
