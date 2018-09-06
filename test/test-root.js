"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("index landing page", function() {
  it("should exist", function() {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});

  describe("Browse Lockers Page", function() {
    it("should exist", function () {
      return chai
        .request(app)
        .get("/browse.html")
        .then(function(res) {
          expect(res).to.have.status(200);
        });
    });
  });

  describe("My Account Page", function() {
    it("should exist", function () {
      return chai
        .request(app)
        .get("/myaccount.html")
        .then(function(res) {
          expect(res).to.have.status(200);
        });
    });
  });

  describe("Public Locker View", function() {
    it("should exist", function () {
      return chai
        .request(app)
        .get("/publiclocker.html")
        .then(function(res){
          expect(res).to.have.status(200);
        });
    });
  });