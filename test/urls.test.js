const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/app");
const should = chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);
const { redisDB } = require("../server/db/redisDB");
const User = require("../server/db/models/user");
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
      hashedPass = await hashPassword(userReq.password);
      await redisDB.flushdb();
      await User.create({ email: userReq.email, password: hashedPass });
    });

    after(async () => {
      await User.deleteMany({});
      await redisDB.flushdb();
    })

    beforeEach((done) => {
      agent
      .post("/login")
      .send({ email: userReq.email, password: userReq.password })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("user");
        res.body.user.email.should.equal(userReq.email);
        done();
      });
    })

    afterEach((done) => {
      agent
        .get("/logout")
        .redirects(1)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.contain("Jeevan Link");
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
          redisDB.get(urlReq.url, (redisErr, redisRes) => {
            res.body.shortUrl.should.equal(redisRes);
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
          redisDB.get(urlReq.url, (redisErr, redisRes) => {
            res.body.shortUrl.should.equal(redisRes);
          });

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

    it("Should redirect a shortened url", (done) => {
      let shortUrl;
      agent
        .post("/shorten")
        .send(urlReq)
        .end(async (err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("shortUrl");
          shortUrl = res.body.shortUrl;

          redisDB.get(urlReq.url, (redisErr, redisRes) => {
            res.body.shortUrl.should.equal(redisRes);
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
  });

  it("Should GET all shortened url/original url pairs", (done) => {
    done();
  });
});
