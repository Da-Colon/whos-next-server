import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as authHelper from "./auth-helpers";
import * as listsHelper from "./lists-helpers";
import { testApp } from "../global.spec";

chai.use(chaiHttp);

describe("Lists Route Tests - /lists", () => {
  const BASE_URL = "/lists";
  const LIST_DETAILS = {
    name: "Test List",
    isPrivate: true,
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

    it("should return message", () => {
      expect(response.body).to.have.property("message");
      expect(response.body.message).equal("success");
    });
  });

  describe("GET - /isPrivate", () => {
    let response;
    before(
      async () =>
        (response = await chai
          .request(app)
          .get(`${BASE_URL}/isPrivate`)
          .set("Authorization", user.token))
    );

    it("should have status code 200", () => {
      expect(response.status).equal(200);
    });

    it("should return all lists", () => {
      expect(response.body).has.length(1);
    });
  });

  describe("GET - /public", () => {
    let response;
    const properties = {
      name: "Test List",
      list: ["Goku", "Gohan"],
      isPrivate: false,
    };
    before(() => listsHelper.createTestList(user, properties));
    
    before(
      async () =>
        (response = await chai
          .request(app)
          .get(`${BASE_URL}/public`)
          .set("Authorization", user.token))
          );
          
          it("should have status code 200", () => {
      expect(response.status).equal(200);
    });

    it("should return all lists", () => {
      expect(response.body).has.length(1);
    });
  });

  describe("GET - /:id", () => {
    let response;

    let listId;

    before(async () => (listId = await listsHelper.createTestList(user)));
    describe("succeeds if", () => {
      before(
        async () =>
          (response = await chai
            .request(app)
            .get(`${BASE_URL}/${listId}`)
            .set("Authorization", user.token))
      );
      it("returns status 200", () => {
        expect(response.status).equal(200);
      });

      it("returns list", () => {
        expect(response.body.id).equal(listId);
      });
    });
    describe("fails if", () => {
      before(
        async () =>
          (response = await chai
            .request(app)
            .get(`${BASE_URL}/610385b5854f641de7de4ab3`)
            .set("Authorization", user.token))
      );
      it("list is not found", () => {
        expect(response.body).has.property("error").equal("list not found");
      });
    });
  });

  describe("PUT /:id", () => {
    const UPDATED_NAME = "Updated Name";
    let response;
    let listId;

    before(async () => (listId = await listsHelper.createTestList(user)));
    before(
      async () =>
        (response = await chai
          .request(app)
          .put(`${BASE_URL}/${listId}`)
          .send({ name: UPDATED_NAME })
          .set("Authorization", user.token))
    );
    it("should return status 200", () => {
      expect(response.status).equal(200);
    });

    it("should update list", async () => {
      const listCollection = await listsHelper.findList(listId);
      expect(listCollection.name).equal(UPDATED_NAME);
    });
  });

  describe("DELETE - /:id", () => {
    let response;
    let listId;

    before(async () => (listId = await listsHelper.createTestList(user)));
    before(
      async () =>
        (response = await chai
          .request(app)
          .delete(`${BASE_URL}/${listId}`)
          .set("Authorization", user.token))
    );
    it("should return status 200", () => {
      expect(response.status).equal(200);
    });
    it('should return status "success"', () => {
      expect(response.body).to.have.property("message");
      expect(response.body.message).equal("success");
    });
  });
});
