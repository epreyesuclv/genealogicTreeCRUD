const {
  updatePerson,
  createPerson,
  getPerson,
  getAllPerson,
  deletePerson,
} = require("./person");

const { createUser, loginUser } = require("./users");

const { createChild, getAllChild, deleteChild, getChild } = require("./child");

const apiDocumentation = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "GenealogicTree-exampleAPI",
    description: "This api is just for testing purpose",
    contact: {
      name: "Starcout",
      email: "epreyesuclv@gmail.com",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:4000/",
      description: "Local Server",
    },
  ],
  tags: [
    {
      name: "Data",
    },
    {
      name: "Users",
    },
  ],
  paths: {
    "/register": {
      post: createUser,
    },
    "/login": {
      post: loginUser,
    },
    "/person": {
      get: getAllPerson,
      post: createPerson,
      put: updatePerson,
      delete: deletePerson,
    },
    "/person/{personid}": {
      get: getPerson,
      put: updatePerson,
      delete: deletePerson,
    },
    "/person/{personid}/{childid}": {
      get: getChild,
      post: createChild,
      delete: deleteChild,
    },
  },
};

module.exports = { apiDocumentation };
