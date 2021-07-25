import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as authHelper from "./auth-helpers"
import { testApp } from "../global.spec";

chai.use(chaiHttp);

describe("Auth Route Tests - /auth", () => {
  const BASE_URL = '/auth';
  const LOGIN_BODY = {email: 'tester@gmail.com', password: 'testPassword'}
  
  let app;

  before(() => app = testApp())

  describe("POST - /auth (LOGIN)", () => {
    let response;
    before(async () => await authHelper.createUser(LOGIN_BODY))
    before(async () => response = await chai.request(app).post(BASE_URL).send(LOGIN_BODY))

    it('should have status code 200', async () => {
      expect(response.status).equal(200)
    })
    
    it('should return user object', async () => {
      expect(response.body).to.haveOwnProperty('user')
    })

    it('should api token', () => {
      expect(response.body).to.haveOwnProperty('token')
    })

  })
})