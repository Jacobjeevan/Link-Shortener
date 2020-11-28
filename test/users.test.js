const chai = require("chai");
const chaiHttp = require("chai-http");
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

describe("Users", () => {
  before(async () => {
    await User.deleteMany({});
    hashedPass = await hashPassword(userReq.password);
  });

  it("Register route - Should successfully register user", (done) => {
    agent
      .post("/register")
      .send(userReq)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("user");
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
        res.body.error.should.have.property("msg");
        res.body.error.msg.should.equal("Email is required");
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
          res.body.error.should.have.property("msg");
          res.body.error.msg.should.equal(
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
        res.body.error.should.have.property("msg");
        res.body.error.msg.should.equal("Please provide a proper email");
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
        res.body.error.should.have.property("msg");
        res.body.error.msg.should.equal("Password is required");
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
        res.body.error.should.have.property("msg");
        res.body.error.msg.should.equal("Password confirmation is required");
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
        res.body.error.should.have.property("msg");
        res.body.error.msg.should.equal(
          "Password confirmation does not match password"
        );
        done();
      });
  });

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
          res.body.user.email.should.equal(userReq.email);
          done();
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
          res.body.error.should.have.property("msg");
          res.body.error.msg.should.equal("Username/password incorrect");
          done();
        });
    });
  });

  afterEach((done) => {
    User.deleteMany({}).then(() => {
      done();
    });
  });
});
