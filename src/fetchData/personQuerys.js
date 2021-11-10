const { ConnectionError, InputRequire } = require("../errors");
const { Person } = require("../models/Person");

const getAllPerson = async () => {
  try {
    return await Person.findAll();
  } catch (err) {
    throw ConnectionError();
  }
};

const getPersonByID = async (id) => {
  try {
    return Person.findByPk(id);
  } catch (err) {
    throw ConnectionError();
  }
};

const createPerson = async (data) => {
  if (!data.id || !data.gender) throw new InputRequire();

  if (data.name?.length ?? 0 < 20) throw new StringTooShort(); //todo

  if (!["Male", "Famale", "Other"].includes(data.gender))
    throw new WrongGender(); //todo

  Person.create(data);
};
