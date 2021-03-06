const {
  ConnectionError,
  InputRequire,
  WrongGender,
  StringTooShort,
  WrongKey,
  Duplicate,
} = require("../errors");

const { Person } = require("../models/Person");
//all these function interact with the model


const getAllPersonQuery = async () => {
  //returns all "Person"s
  //throws ConnectionError

  try {
    return await Person.findAll();
  } catch (err) {
    //console.log(err);
    throw ConnectionError();
  }
};

const getPersonByIDQuery = async ({ id }) => {
  //returns a "Person" that math with the given "id"
  if (!id) throw new InputRequire();
  //throws InputRequre ,ConnectionError

  try {
    const person = await Person.findByPk(id);
    if (!person) throw new WrongKey();
    return person;
  } catch (err) {
    if (err instanceof WrongKey) throw new WrongKey();
    //console.log("inside getPersonByIDQuery", err);
    else throw ConnectionError();
  }
};

const createPersonQuery = async (data) => {
  //creates a "Person" with the given data
  //throws InputRequre , StringTooShort , WrongGender , ConnectionError , Duplicate

  if (!data.id || !data.gender) throw new InputRequire();

  if ((data.name?.length ?? 0) < 20) throw new StringTooShort();

  if (!["Male", "Famale", "Other"].includes(data.gender))
    throw new WrongGender();

  try {
    //console.log(data);
    const person = await Person.findByPk(data.id);
    if (person) throw new Duplicate();
    return await Person.create(data);
  } catch (err) {
    //console.log(err);
    if (err instanceof Duplicate) throw new Duplicate();
    else throw new ConnectionError();
  }
};

const updatePersonQuery = async ({ id, toUpdate }) => {
  //updates the "Person" with the given data
  //throws InputRequre , WrongKey , ConnectionError

  if (!id) throw new InputRequire();

  let person;

  try {
    person = await Person.findByPk(id);
  } catch (err) {
    throw new ConnectionError();
  }

  if (!person) throw new WrongKey();

  person.name = toUpdate.name ?? person.name;
  person.gender = toUpdate.gender ?? person.gender;
  person.lastname = toUpdate.lastname ?? person.lastname;
  person.married = toUpdate.married ?? person.married;
  person.age = toUpdate.age ?? person.age;

  await person.save();

  return person;
};

const deletePersonQuery = async ({ id }) => {
  //deletes the "Person" that match with the given id
  //throws InputRequre , WrongKey , ConnectionError

  if (!id) throw new InputRequire();
  let person;
  try {
    person = await Person.findByPk(id);

    if (!person) throw new WrongKey();

    (await person).destroy();
  } catch (err) {
    if (err instanceof WrongKey) throw new WrongKey();
    else throw new ConnectionError();
  }
};

module.exports = {
  getAllPersonQuery,
  deletePersonQuery,
  updatePersonQuery,
  createPersonQuery,
  getPersonByIDQuery,
};
