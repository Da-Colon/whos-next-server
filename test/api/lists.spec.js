import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as authHelper from "./auth-helpers";
import { testApp } from "../global.spec";

chai.use(chaiHttp);

describe("Lists Route Tests - /lists", () => {
  const BASE_URL = "/lists";
  const LIST_DETAILS = {
    listName: "Test List",
    private: false,
    list: ["Goku", "Gohan"],
  };
  let app;
  let user;

  before(() => (app = testApp()));
  before(() => authHelper.createUser());
  before(async () => (user = await authHelper.loginUser()));

  describe("POST - /lists (Create List)", () => {
    let response;
    before(
      async () =>
        (response = await chai
          .request(app)
          .post(BASE_URL)
          .send(LIST_DETAILS)
          .set("Authorization", user.token))
    );

    it("should have status code 200", () => {
      expect(response.status).equal(200);
    });

    // it("should return message", () => {
   
    // });
  });
});
