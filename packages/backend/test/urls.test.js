const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/app");
const should = chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);
const User = require("../server/db/models/user"),
  Url = require("../server/db/models/url");
const { hashPassword } = require("../server/helpers/user.helper");

let urlReq = {
  url: "https://jacobjeevan.me/",
  user: null,
};

const userReq = {
  email: "doom@doom.net",
  password: "d00mTest12",
  passwordConfirm: "d00mTest12",
};

let hashedPass;

describe("URLs", () => {
  describe("Unauthenticated User", () => {
    it("Shorten URL - Should return an Error", (done) => {
      agent
        .post("/shorten")
        .send(urlReq)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          res.body.error.should.equal("Please login first");
          done();
        });
    });

    it("Delete short URL - Should return an Error", (done) => {
      agent.post("/delete/").end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error");
        res.body.error.should.equal("Please login first");
        done();
      });
    });
  });

  describe("Authenticated User", () => {
    before(async () => {
      await User.deleteMany({});
      await Url.deleteMany({});
      hashedPass = await hashPassword(userReq.password);
      await User.create({ email: userReq.email, password: hashedPass });
    });

    after(async () => {
      await User.deleteMany({});
      await Url.deleteMany({});
    });

    beforeEach((done) => {
      Url.deleteMany({}).then(() => {
        agent
          .post("/login")
          .send({ email: userReq.email, password: userReq.password })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("user");
            res.body.user.should.have.property("email");
            res.body.user.should.have.property("id");
            res.body.user.email.should.equal(userReq.email);
            done();
          });
      });
    });

    afterEach((done) => {
      agent.get("/logout").end((err, res) => {
        res.should.have.status(200);
        res.body.should.property("success");
        res.body.success.should.equal(true);
        done();
      });
    });

    it("Should shorten a url", (done) => {
      agent
        .post("/shorten")
        .send(urlReq)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          Url.findOne({ longUrl: urlReq.url }).then((urlEntry) => {
            res.body.shortUrl.should.equal(urlEntry.shortUrl);
            done();
          });
        });
    });

    it("Should return same shortened url if original URL is already in DB", (done) => {
      let shortUrl;
      agent
        .post("/shorten")
        .send(urlReq)
        .end(async (err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          shortUrl = res.body.shortUrl;
          Url.findOne({ longUrl: urlReq.url }).then((urlEntry) => {
            res.body.shortUrl.should.equal(urlEntry.shortUrl);
            agent
              .post("/shorten")
              .send(urlReq)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("shortUrl");
                res.body.shortUrl.should.equal(shortUrl);
                done();
              });
          });
        });
    });

    it("Short url should return long url", (done) => {
      let shortUrl;
      agent
        .post("/shorten")
        .send(urlReq)
        .end(async (err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          shortUrl = res.body.shortUrl;
          Url.findOne({ longUrl: urlReq.url }).then((urlEntry) => {
            res.body.shortUrl.should.equal(urlEntry.shortUrl);
            agent.get(`/${shortUrl}`).end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("success");
              res.body.success.should.equal(true);
              res.body.should.have.property("url");
              res.body.url.should.equal(urlReq.url);
              done();
            });
          });
        });
    });

    it("Should create a custom Short url", (done) => {
      agent
        .post("/shorten")
        .send({ ...urlReq, customURL: "portfolio" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          Url.findOne({ longUrl: urlReq.url }).then((urlEntry) => {
            res.body.shortUrl.should.equal(urlEntry.shortUrl);
            done();
          });
        });
    });

    it("Should return error if custom Short url exists", (done) => {
      agent
        .post("/shorten")
        .send({ ...urlReq, customURL: "portfolio" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          Url.findOne({ longUrl: urlReq.url }).then((urlEntry) => {
            res.body.shortUrl.should.equal(urlEntry.shortUrl);
            agent
              .post("/shorten")
              .send({ ...urlReq, customURL: "portfolio" })
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                res.body.error.should.equal("Custom Link already exists");
                done();
              });
          });
        });
    });

    it("Custom short url should return long url", (done) => {
      agent
        .post("/shorten")
        .send({ ...urlReq, customURL: "portfolio" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          Url.findOne({ longUrl: urlReq.url }).then((urlEntry) => {
            res.body.shortUrl.should.equal(urlEntry.shortUrl);
            agent.get("/portfolio").end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("success");
              res.body.success.should.equal(true);
              res.body.should.have.property("url");
              res.body.url.should.equal(urlReq.url);
              done();
            });
          });
        });
    });

    it("Should GET a user's short Urls", (done) => {
      agent
        .post("/shorten")
        .send({ ...urlReq, customURL: "portfolio" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          agent.get("/all/").end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("success");
            res.body.success.should.equal(true);
            res.body.should.have.property("links");
            res.body.links.should.have.length(1);
            res.body.links[0].shortUrl.should.equal("portfolio");
            done();
          });
        });
    });

    it("Should delete shortUrl", (done) => {
      agent
        .post("/shorten")
        .send({ ...urlReq, customURL: "portfolio" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          Url.findOne({ shortUrl: "portfolio" }).then((UrlEntry) => {
            agent
              .post("/delete/")
              .send({ urlId: UrlEntry._id })
              .end((err, resDelete) => {
                resDelete.should.have.status(200);
                resDelete.body.should.have.property("success");
                resDelete.body.success.should.equal(true);
                Url.findOne({ shortUrl: "portfolio" }).then((shouldBeNull) => {
                  if (shouldBeNull === null) {
                    done();
                  }
                });
              });
          });
        });
    });
  });
});
