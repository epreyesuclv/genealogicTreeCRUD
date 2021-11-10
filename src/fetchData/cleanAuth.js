const bcrypt = require("bcryptjs");

const {
  IncorrectCredentials,
  InputRequire,
  Duplicate,
  ConnectionError,
} = require("../errors");

const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

require("dotenv").config();

const EXPIRES_TIME = 10;
//throw: InputRequireError , IncorrectCredentialError
async function cleanLogin(email, password) {
  if (!(email && password)) {
    throw new InputRequire();
  }

  const user = await User.findByPk(email);
  //console.log("clean auth ", user);

  if (user === null) throw new IncorrectCredentials();

  if (user === undefined) throw new ConnectionError();

  //console.log(user)
  if (user && (await bcrypt.compare(password, user.pass))) {
    //console.log("cleanAuth - cleanLogin",email)
    const token = getToken(email);

    user.token = token;
    //console.log("in cleanAuth",user)
    return user;
  }

  throw new IncorrectCredentials();
}

//throws : IntputRequireError , DuplicateEmailError , IncorrectCredentialsError
async function cleanRegister(name, email, password) {
  //veryfiying if the fields are empty
  if (!(email && password && name))
    // res.status(400).send("All input is required")
    throw new InputRequire();

  //console.log("cleanAuth-cleanRegister ",busy)

  //veryfying if the user already exist

  const oldUser = await User.findByPk(email).catch((err) => {
    console.log(err);
    throw new ConnectionError();
  });

  if (oldUser)
    //return res.status(409).send("user aready exist")
    throw new Duplicate();

  //encypting the pass
  const encryptedPass = await bcrypt.hash(password, 11);

  //creating token
  const token = getToken(email);

  //creating the user
  const user = await User.create({
    name: name,
    email: email.toLowerCase(),
    pass: encryptedPass,
  });

  user.token = token;

  return user;
}

function getToken(email) {
  //console.log("cleanAuth-getToken", email);
  const token = jwt.sign(
    {
      user_id: email,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: `${EXPIRES_TIME}h`,
    }
  );
  return token;
}

module.exports = {
  cleanLogin,
  cleanRegister,
};
