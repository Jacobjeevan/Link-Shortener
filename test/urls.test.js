const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/app");
const should = chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);
const { redisDB } = require("../server/db/redisDB");

const urlReq = {
  url: "https://jacobjeevan.me/",
};

describe("URLs", () => {
  before(async () => {
    await redisDB.flushdb();
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
    before(async () => {
      await redisDB.flushdb();
    });

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
    before(async () => {
      await redisDB.flushdb();
    });

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

  it("Should GET all shortened url/original url pairs", (done) => {
    done();
  });

  after(async () => {
    await redisDB.flushdb();
  });
});
