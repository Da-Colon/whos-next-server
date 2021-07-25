import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { testApp } from "../global.spec";

chai.use(chaiHttp);

describe("Users Route Tests - /user", () => {
  const BASE_URL = "/users";
  const SIGN_UP = { email: "test_signup@gmail.com", password: "testPassword" };

  let app;
  before(() => (app = testApp()));

  describe("POST - /users (SIGN-UP)", () => {
    let response;
    before(
      async () =>
        (response = await chai.request(app).post(BASE_URL).send(SIGN_UP))
    );

    it("should have status code 200", async () => {
      expect(response.status).equal(200);
    });

    it("should return user object", async () => {
      expect(response.body).to.haveOwnProperty("message");
      expect(response.body.message).to.equal("User has been registered");
    });
  });
});
