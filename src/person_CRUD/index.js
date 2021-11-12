const {
  createPersonQuery,
  getAllPersonQuery,
  updatePersonQuery,
  getPersonByIDQuery,
  deletePersonQuery,
} = require("../fetchData/personQuerys");

const { getAllByFatherQuery } = require("../fetchData/childQuery");

//type of errors
const {
  StringTooShort,
  ConnectionError,
  WrongKey,
  InputRequire,
  Duplicate,
  WrongGender,
} = require("../errors");

async function createPerson(req, res) {
  //this function creates a Person and make a response in json format

  const { id, name, lastname, gender, married, age } = req.body;

  try {
    const person = await createPersonQuery({
      id,
      name,
      lastname,
      gender,
      married,
      age,
    });

    //const childs = await getAllByFatherQuery({id})
    person.childs = [];
    res.status(200).json(person);
  } catch (err) {
    //console.log(err);

    if (err instanceof Duplicate)
      res.status(409).send("this ID is already in use");
    if (err instanceof InputRequire)
      res.status(403).send("ID an Gender is required");

    if (err instanceof StringTooShort)
      res.status(409).send("your name must contain at least 20 characters");

    if (err instanceof WrongGender)
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
//this function respond a list of Person in json format

  try {
    let persons = await getAllPersonQuery();
    /** if we want to do some optimization, we have a field in the database that counts
     * the amount of childs while are inserted
     */
    let personsNew = [];

    for await (let p of persons) {
      const childs = await getAllByFatherQuery({ id: p.id });
      p.dataValues.childs = childs.length;
      personsNew.push(p);
    }
    console.log(personsNew);
    res.status(200).json(personsNew);
  } catch (err) {
    console.log(err);
    if (err instanceof ConnectionError)
      res
        .status(503)
        .send("this must be somthing wrong with the database server");
  }
}

async function updatePerson(req, res) {
  //finds the person that match with the given "id", and change its attributes
  /** "toUpdate" need to be as follow example
   * 
   * toUpdate:{
   * name:"example",
   * lastname:"example",
   * gender:"Male",
   * married:true,
   * age:32
   * }
   * 
   * you can omit the attributes that you don't want to change
   */ 
  const { id } = req.body || req.params;

  const { toUpdate } = req.body;
  try {
    const person = await updatePersonQuery({ id, toUpdate });

    const childs = await getAllByFatherQuery({ id });
    person.dataValues.childs = [];
    childs.forEach((value) => {
      person.dataValues.childs.push(value.dataValues);
    });
    
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
  //deletes the person that match with the given "id",
  //if he has a child it will be deleted too ( CASCADE )
  try {
    const id = req.body.id || req.params.id;
    await deletePersonQuery({ id });
    res.status(200).send(`${id} delete successful`);
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

async function getPersonByID(req, res) {

  //make a response with the person that match with the given "id" , in json format 

  //console.log(req.params);
  const id = req.params.personid;

  try {
    const person = await getPersonByIDQuery({ id });
    const childs = await getAllByFatherQuery({ id });
    person.dataValues.childs = [];
    childs.forEach((value) => {
      person.dataValues.childs.push(value.dataValues);
    });

    console.log(person);
    res.status(200).json(person);
  } catch (err) {
    if (err instanceof WrongKey) res.status(404).send("User not found");

    if (err instanceof InputRequire)
      res.status(403).send("the person's ID is required");

    if (err instanceof ConnectionError)
      res
        .status(503)
        .send("this must be somthing wrong with the database server");
  }
}

module.exports = {
  createPerson,
  getAllPerson,
  updatePerson,
  deletePersonByID,
  getPersonByID,
};
