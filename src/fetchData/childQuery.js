const {
  ConnectionError,
  InputRequire,
  StringTooShort,
  WrongKey,
  Duplicate,
} = require("../errors");

//all this functions interact with the model,

const { Child } = require("../models/Child");

const getAllChildQuery = async () => {
  // returns all children
  //throw ConnectionError
  try {
    return await Child.findAll();
  } catch (err) {
    throw ConnectionError();
  }
};

const getChildByIDQuery = async ({ id }) => {
  //returns the child that match with the given "id"
  //throws InputRequire , WrongKey , ConnectionError
  let child;
  try {
    if (!id) throw new InputRequire();
    child = await Child.findByPk(id);

    if (!child) throw new WrongKey();

    return await Child.findByPk(id);
  } catch (err) {
    throw ConnectionError();
  }
};

const createChildQuery = async (data) => {
  //creates a new child with the given data
  //throws InputRequire , StringTooShort , ConnectionError , DUplicate
  if (!data.id) throw new InputRequire();

  if ((data.name?.length ?? 0) < 20) throw new StringTooShort();

  try {
    const child = await Child.findByPk(data.id);
    //console.log(child);
    if (child) throw new Duplicate();

    return await Child.create(data);
  } catch (err) {
    //console.log(err);
    if (err instanceof Duplicate) throw new Duplicate();
    else throw new ConnectionError();
  }
};

const getAllByFatherQuery = async ({ id }) => {
  //finds all "Child"s  that match "personID" with the "id" pass as parameters
  //in other words , finds all children that has as father the one given as parameters
  try {
    return await Child.findAll({
      where: {
        personID: id,
      },
    });
  } catch (err) {
    //console.log("inside getAllByFatherQuery", err);
    throw new ConnectionError();
  }
};

const deleteChildQuery = async ({ id }) => {
  //deletes the child that match with the given "id"
  //throws InputRequire , WrongKey , ConnectionError
  if (!id) throw new InputRequire();
  let child;
  try {
    child = await Child.findByPk(id);

    if (!child) throw new WrongKey();

    (await child).destroy();
  } catch (err) {
    if (err instanceof WrongKey) throw new WrongKey();
    else throw new ConnectionError();
  }
};

module.exports = {
  deleteChildQuery,
  getAllByFatherQuery,
  createChildQuery,
  getChildByIDQuery,
  getAllChildQuery,
};
