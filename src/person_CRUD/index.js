const {
  createPersonQuery,
  getAllPersonQuery,
  updatePersonQuery,
} = require("../fetchData/personQuerys");
const { getAllByFatherQuery } = require("../fetchData/childQuery");
const { Child } = require("../models/Child");
const { StringTooShort, ConnectionError, WrongKey } = require("../errors");

async function createPerson(req, res) {
  const { id, name, lastName, gender, married, age } = req.body;

  try {
    const person = await createPersonQuery({
      id,
      name,
      lastName,
      gender,
      married,
      age,
    });

    //const childs = await getAllByFatherQuery({id})
    person.childs = [];
    res.status(200).json(person);
  } catch (err) {
    if (err instanceof InputRequire)
      res.status(403).send("ID an Gender is required");

    if (err instanceof StringTooShort)
      res.status(409).send("your name must contain at least 20 characters");

    if (err instanceof InputRequire)
      res
        .status(409)
        .send(
          "the property 'gender' must be one of the following values : [ 'Male', 'Famale', 'Other']"
        );

    if (err instanceof ConnectionError)
      res
        .status(503)
        .send("this must be somthing wrong with the database server");
  }
}

async function getAllPerson(req, res) {
  try {
    const persons = await getAllPersonQuery();
    res.status(200).json(persons);
  } catch (err) {
    if (err instanceof ConnectionError)
      res
        .status(503)
        .send("this must be somthing wrong with the database server");
  }
}

async function updatePerson(req, res) {
  const { id, toUpdate } = req.body;
  try {
    const person = await updatePersonQuery({ id, toUpdate });

    const childs = await getAllByFatherQuery({ id });
    person.childs = childs;
    res.status(200).json(person);

  } catch (err) {
    if (err instanceof InputRequire)
      res.status(403).send("the person's ID is required");

    if (err instanceof WrongKey)
      res.status(409).send("there isn't anyone with this key");

    if (err instanceof ConnectionError)
      res
        .status(503)
        .send("this must be somthing wrong with the database server");
  }
}

async function deletePersonByID(req, res) {
  //todo
}

async function getPersonByID(req, res) {
  const childs = await getAllByFatherQuery({ id });
  person.childs = childs;
  res.status(200).json(person);
}

module.exports = {
  createPerson,
  getAllPerson,
  updatePerson,
  deletePersonByID,
  getPersonByID,
};
