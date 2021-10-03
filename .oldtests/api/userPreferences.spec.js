import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as authHelper from "./auth-helpers";
import * as listsHelper from "./lists-helpers";
import * as userPreferencesHelper from "./userPreferences-helpers"
import { testApp } from "../global.spec";
import Mongoose from "mongoose";

chai.use(chaiHttp);

describe("UserPreferences Route Tests - /userPreferences", () => {
  const newUserBody = {
    email: "testPreference@example.com",
    password: "password",
  }
  const BASE_URL = "/userPreferences";
  let listId;
  let app;
  let user;

  before(() => (app = testApp()));
  before(async () => await authHelper.createUser(newUserBody))
  before(async () => (user = await authHelper.loginUser(newUserBody)));
  before(async () => (listId = await listsHelper.createTestList(user)));

  describe("PUT - select/:listId", () => {
    let response;

    describe("succeeds if", () => {
      before(
        async () =>
          (response = await chai
            .request(app)
            .put(`${BASE_URL}/select/${listId}`)
            .set("Authorization", user.token))
      );
      it("returns status 200", () => {
        expect(response.status).equal(200);
      });

      it("returns message", () => {
        expect(response.body.message).equal("update Successful");
      });
      it("selected list is added to userPreferences", async () => {
        const {selectedList} = await userPreferencesHelper.getUserPreferences(user.user)
        expect(selectedList).eql(Mongoose.Types.ObjectId(listId))
      })
    });
    describe("if give invalid list", () => {
      before(
        async () =>
          (response = await chai
            .request(app)
            .put(`${BASE_URL}/select/jdalsdjasjdjoi1`)
            .set("Authorization", user.token))
      );
      it("returns status 500", () => {
        expect(response.status).equal(500);
      });

      it("returns message", () => {
        expect(response.body.error).equal(
          "database error: unable to update UserPreferences"
        );
      });
    });
  });
  describe("PUT - like/:listId", () => {
    let response;

    describe("succeeds if", () => {
      before(
        async () =>
          (response = await chai
            .request(app)
            .put(`${BASE_URL}/like/${listId}`)
            .set("Authorization", user.token))
      );
      it("returns status 200", () => {
        expect(response.status).equal(200);
      });

      it("returns message", () => {
        expect(response.body.message).equal("update Successful");
      });
    });
    describe("if give invalid list id", () => {
      before(
        async () =>
          (response = await chai
            .request(app)
            .put(`${BASE_URL}/select/jdalsdjasjdjoi1`)
            .set("Authorization", user.token))
      );
      it("returns status 500", () => {
        expect(response.status).equal(500);
      });

      it("returns message", () => {
        expect(response.body.error).equal(
          "database error: unable to update UserPreferences"
        );
      });
    });
  });
  describe("PUT - unlike/:listId", () => {
    let response;

    describe("succeeds if", () => {
      before(
        async () =>
          (response = await chai
            .request(app)
            .put(`${BASE_URL}/unlike/${listId}`)
            .set("Authorization", user.token))
      );
      it("returns status 200", () => {
        expect(response.status).equal(200);
      });

      it("returns message", () => {
        expect(response.body.message).equal("update Successful");
      });
    });
    describe("if give invalid list id", () => {
      before(
        async () =>
          (response = await chai
            .request(app)
            .put(`${BASE_URL}/select/jdalsdjasjdjoi1`)
            .set("Authorization", user.token))
      );
      it("returns status 500", () => {
        expect(response.status).equal(500);
      });

      it("returns message", () => {
        expect(response.body.error).equal(
          "database error: unable to update UserPreferences"
        );
      });
    });
  });
  describe("GET - /", () => {
    let response;

    before(
      async () =>
        (response = await chai
          .request(app)
          .get(`${BASE_URL}`)
          .set("Authorization", user.token))
    );
    it("returns status 200", () => {
      expect(response.status).equal(200);
    });

    it("returns users' userPreferences", () => {
      expect(response.body.userId).equal(user.user.id);
    });
  })
});
