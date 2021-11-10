const {
  ConnectionError,
  InputRequire,
  WrongGender,
  StringTooShort,
  WrongKey,
} = require("../errors");

const { Child } = require("../models/Child");

const getAllChildQuery = async () => {
  try {
    return await Child.findAll();
  } catch (err) {
    throw ConnectionError();
  }
};

const getChildByIDQuery = async ({ id }) => {
  try {
    if (!id) throw new InputRequire();

    return await Child.findByPk(id);
  } catch (err) {
    throw ConnectionError();
  }
};

const createChildQuery = async (data) => {
  if (!data.id) throw new InputRequire();

  if (data.name?.length ?? 0 < 20) throw new StringTooShort();

  try {
    return await Child.create(data);
  } catch (err) {
    throw new ConnectionError();
  }
};

const getAllByFatherQuery = async ({ fatherID }) => {
  try {
    return await Child.findAll({
      where: {
        personID: fatherID,
      },
    });
  } catch (err) {
    throw new ConnectionError();
  }
};

const deleteChildQuery = async ({ id }) => {
  if (!id) throw new InputRequire();
  let child;
  try {
    child = await Child.findByPk(id);

    if (child) throw new WrongKey();

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
