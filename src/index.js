const express = require("express");
require("./models/index").sequelize.sync();
const { register, login } = require("./middelwares/auth");
const { verifyingToken } = require("./middelwares/authToken");
const { childConfig } = require("./middelwares/child_config");
const {
  getAllPerson,
  getPersonByID,
  createPerson,
  updatePerson,
  deletePersonByID,
} = require("./person_CRUD");

// database connection
require("dotenv").config();

// port config

var port = process.env.PORT || 4000;

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//rutas

//authentication

app.post("/register", register);
app.post("/login", login);

//CRUD
app.get("/person", getAllPerson);
app.get("/person/:personid", getPersonByID);

app.post("/person", verifyingToken, createPerson);
app.put("/person", verifyingToken, updatePerson);
app.delete("/person", verifyingToken, deletePersonByID);
app.delete("/person/:personid", verifyingToken, deletePersonByID);

app.use("/person/:personid", childConfig, require("./childRoot"));

//runserver
app.listen(port, () => {
  console.log("server is runnig on port " + port);
});
