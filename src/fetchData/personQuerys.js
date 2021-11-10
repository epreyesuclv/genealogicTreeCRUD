const {
  ConnectionError,
  InputRequire,
  WrongGender,
  StringTooShort,
  WrongKey,
} = require("../errors");

const { Person } = require("../models/Person");

const getAllPersonQuery = async () => {
  //throw ConnectionError
  
  try {
    return await Person.findAll();
  } catch (err) {
    throw ConnectionError();
  }
};

const getPersonByIDQuery = async ({ id }) => {
  if (!id) throw new InputRequire();
  //throw InputRequre ,ConnectionError

  try {
    return await Person.findByPk(id);
  } catch (err) {
    throw ConnectionError();
  }
};

const createPersonQuery = async (data) => {
  //throw InputRequre , StringTooShort , WrongGender , ConnectionError

  if (!data.id || !data.gender) throw new InputRequire();

  if (data.name?.length ?? 0 < 20) throw new StringTooShort();

  if (!["Male", "Famale", "Other"].includes(data.gender))
    throw new WrongGender();

  try {
    return await Person.create(data);
  } catch (err) {
    throw new ConnectionError();
  }
};

const updatePersonQuery = async ({ id, toUpdate }) => {
  //throw InputRequre , WrongKey , ConnectionError

  if (!id) throw new InputRequire();

  let person;

  try {
    person = await Person.findByPk(id);
  } catch (err) {
    throw new ConnectionError();
  }

  if (!person) throw new WrongKey();

  person.name = toUpdate.name || person.name;
  person.gender = toUpdate.gender || person.gender;
  person.lastName = toUpdate.lastName || person.lastName;
  person.married = toUpdate.married || person.married;
  person.age = toUpdate.age || person.age;

  await person.save();

  return person;
};

const deletePersonQuery = async ({ id }) => {
  //throw InputRequre , WrongKey , ConnectionError
  
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
