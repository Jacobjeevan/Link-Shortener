const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/app");
const should = chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);
const User = require("../server/db/models/user"),
  Url = require("../server/db/models/url");
const { hashPassword } = require("../server/helpers/user.helper");

const urlReq = {
  url: "https://jacobjeevan.me/",
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
          res.body.error.should.have.property("msg");
          res.body.error.msg.should.equal("Please login first");
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
            res.body.user.email.should.equal(userReq.email);
            done();
          });
      });
    });

    afterEach((done) => {
      agent
        .get("/logout")
        .redirects(1)
        .end((err, res) => {
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

    it("Should redirect a shortened url", (done) => {
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
              .get(`/${shortUrl}`)
              .redirects(1)
              .end((err, res) => {
                res.should.have.status(200);
                res.text.should.contain("My name is Jacob Jeevan.");
                done();
              });
          });
        });
    });

    it("Should create a custom Short url", (done) => {
      agent
        .post("/shorten")
        .send({ ...urlReq, customURL: true, shortUrl: "portfolio" })
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
        .send({ ...urlReq, customURL: true, shortUrl: "portfolio" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          Url.findOne({ longUrl: urlReq.url }).then((urlEntry) => {
            res.body.shortUrl.should.equal(urlEntry.shortUrl);
            agent
              .post("/shorten")
              .send({ ...urlReq, customURL: true, shortUrl: "portfolio" })
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                res.body.error.should.have.property("msg");
                res.body.error.msg.should.equal("Custom Link already exists");
                done();
              });
          });
        });
    });

    it("Should redirect custom Short url", (done) => {
      agent
        .post("/shorten")
        .send({ ...urlReq, customURL: true, shortUrl: "portfolio" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          Url.findOne({ longUrl: urlReq.url }).then((urlEntry) => {
            res.body.shortUrl.should.equal(urlEntry.shortUrl);
            agent
              .get("/portfolio")
              .redirects(1)
              .end((err, res) => {
                res.should.have.status(200);
                res.text.should.contain("My name is Jacob Jeevan.");
                done();
              });
          });
        });
    });

    /* it("Should GET all shortened url/original url pairs", (done) => {
      agent.get("/all").end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        done();
      });
    }); */
  });
});
