const express = require("express");

// database connection
require("./models/index").sequelize.sync();

const { register, login } = require("./middelwares/auth");
const { verifyingToken } = require("./middelwares/verifyingToken");
const { childConfig } = require("./middelwares/child_config");
const {
  getAllPerson,
  getPersonByID,
  createPerson,
  updatePerson,
  deletePersonByID,
} = require("./person_CRUD");

//loading .env file
require("dotenv").config();


//for documentation 

const { apiDocumentation } = require('../doc/apidoc.js')
//for documentation with swagger
const swaggerui = require("swagger-ui-express")
// port config
var port = process.env.PORT || 4000;

const app = express();

app.use("/api-doc", swaggerui.serve, swaggerui.setup(apiDocumentation))


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//routes

//authentication
app.post("/register", register);
app.post("/login", login);

//CRUD
app.get("/person", getAllPerson);
app.get("/person/:personid", getPersonByID);

//routes that need middelwares
app.post("/person", verifyingToken, createPerson);
app.put("/person", verifyingToken, updatePerson);

app.delete("/person", verifyingToken, deletePersonByID);
app.put("/person/:personid", verifyingToken, updatePerson);
app.delete("/person/:personid", verifyingToken, deletePersonByID);

app.use("/person/:personid", childConfig, require("./childRoot"));

//runserver
app.listen(port, () => {
  console.log("server is runnig on port " + port);
});
