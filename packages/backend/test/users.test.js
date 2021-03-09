const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const dayjs = require("dayjs");
const server = require("../server/app");
const should = chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);
const User = require("../server/db/models/user");
const { hashPassword } = require("../server/helpers/user.helper");

const userReq = {
  email: "doom@doom.net",
  password: "d00mTest12",
  passwordConfirm: "d00mTest12",
};

let hashedPass;
let token;

describe("Users", () => {
  before(async () => {
    await User.deleteMany({});
    hashedPass = await hashPassword(userReq.password);
  });

  describe("Register routes", () => {
    it("Register route - Should successfully register user", (done) => {
      agent
        .post("/register")
        .send(userReq)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("user");
          res.body.user.should.have.property("email");
          res.body.user.should.have.property("id");
          res.body.user.email.should.equal(userReq.email);
          done();
        });
    });

    it("Register route - Should return error for missing email", (done) => {
      agent
        .post("/register")
        .send({ ...userReq, email: null })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          res.body.error.should.contain("Email is required");
          done();
        });
    });

    it("Register route - Should return error if user already exists", (done) => {
      User.create({
        email: userReq.email,
        password: hashedPass,
      }).then(() => {
        agent
          .post("/register")
          .send(userReq)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property("error");
            res.body.error.should.contain(
              "Email is taken - User already exists"
            );
            done();
          });
      });
    });

    it("Register route - Should return error for improper email", (done) => {
      agent
        .post("/register")
        .send({ ...userReq, email: "doom" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          res.body.error.should.contain("Please provide a proper email");
          done();
        });
    });

    it("Register route - Should return error for missing password", (done) => {
      agent
        .post("/register")
        .send({ ...userReq, password: null })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          res.body.error.should.contain("Password is required");
          done();
        });
    });

    it("Register route - Should return error for missing password confirmation", (done) => {
      agent
        .post("/register")
        .send({ ...userReq, passwordConfirm: null })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          res.body.error.should.contain("Password confirmation is required");
          done();
        });
    });

    it("Register route - Should return error if password does not equal password confirmation", (done) => {
      agent
        .post("/register")
        .send({ ...userReq, passwordConfirm: "test" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          res.body.error.should.contain(
            "Password confirmation does not match password"
          );
          done();
        });
    });
  });

  describe("Login routes", () => {
    it("Login route - Should successfully login user", (done) => {
      User.create({
        email: userReq.email,
        password: hashedPass,
      }).then(() => {
        agent
          .post("/login")
          .send({ email: userReq.email, password: userReq.password })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("user");
            res.body.user.should.have.property("email");
            res.body.user.should.have.property("id");
            res.body.user.email.should.equal(userReq.email);

            agent.get("/logout").end((err, res) => {
              res.should.have.status(200);
              res.body.should.property("success");
              res.body.success.should.equal(true);
              done();
            });
          });
      });
    });

    it("Login route - Should return error for wrong password", (done) => {
      User.create({
        email: userReq.email,
        password: hashedPass,
      }).then(() => {
        agent
          .post("/login")
          .send({ email: userReq.email, password: "testSomething" })
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property("error");
            res.body.error.should.contain("Username/password incorrect");
            done();
          });
      });
    });
  });

  it("Logout route", (done) => {
    User.create({
      email: userReq.email,
      password: hashedPass,
    }).then(() => {
      agent
        .post("/login")
        .send({ ...userReq, passwordConfirm: null })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("user");
          res.body.user.should.have.property("email");
          res.body.user.should.have.property("id");
          res.body.user.email.should.equal(userReq.email);

          agent.get("/logout").end((err, res) => {
            res.should.have.status(200);
            res.body.should.property("success");
            res.body.success.should.equal(true);
            done();
          });
        });
    });
  });

  describe("Password Reset routes", () => {
    it("Should successfully request password reset", (done) => {
      User.create({
        email: userReq.email,
        password: hashedPass,
      }).then(() => {
        agent
          .post("/password/reset")
          .send({ email: userReq.email })
          .end((err, reqResetRes) => {
            reqResetRes.should.have.status(200);
            reqResetRes.body.should.have.property("success");
            reqResetRes.body.success.should.equal(true);
            reqResetRes.body.should.have.property("token");
            token = reqResetRes.body.token;
            agent.get(`/password/reset/${token}`).end((err, getResetRes) => {
              getResetRes.should.have.status(200);
              getResetRes.body.should.have.property("success");
              getResetRes.body.success.should.equal(true);
              done();
            });
          });
      });
    });

    it("Should successfully change password", (done) => {
      User.create({
        email: userReq.email,
        password: hashedPass,
        token,
        tokenExpiration: dayjs().add(2, "hour"),
      }).then(() => {
        agent
          .post(`/password/reset/${token}`)
          .send({
            password: "d00mTest13",
          })
          .end((err, postResetRes) => {
            postResetRes.should.have.status(200);
            postResetRes.body.should.have.property("success");
            postResetRes.body.success.should.equal(true);

            agent
              .post("/login")
              .send({ email: userReq.email, password: "d00mTest13" })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("user");
                res.body.user.should.have.property("email");
                res.body.user.should.have.property("id");
                res.body.user.email.should.equal(userReq.email);

                agent.get("/logout").end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.property("success");
                  res.body.success.should.equal(true);
                  done();
                });
              });
          });
      });
    });
  });

  afterEach((done) => {
    User.deleteMany({}).then(() => {
      done();
    });
  });
});
