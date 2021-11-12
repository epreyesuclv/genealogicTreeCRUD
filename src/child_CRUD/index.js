const {
  InputRequire,
  StringTooShort,
  ConnectionError,
  Duplicate,
  WrongKey,
} = require("../errors");
const {
  getAllChildQuery,
  createChildQuery,
  deleteChildQuery,
  getChildByIDQuery,
} = require("../fetchData/childQuery");

//these function are in charge to handle data pass in the req and respond accordingly to that, handle error and
//fetch the data

async function createChild(req, res) {
  //creates a new child

  const { personID } = req;
  //console.log(personID);

  const { id, name } = req.body;
  try {
    const newChild = await createChildQuery({
      id,
      name,
      personID,
    });
    res.status(200).send(newChild);
  } catch (err) {
    //console.log(err)
    if (err instanceof Duplicate)
      res.status(409).send("this child ID is already in use");
    if (err instanceof InputRequire) res.status(403).send("ID required");
    if (err instanceof StringTooShort)
      res
        .status(409)
        .send("your name is too short, it must have at least 20 characters");
    if (err instanceof ConnectionError)
      res.status(503).send("This is probable a database issue");
  }
}

async function getAllChild(req, res) {
  //make a response with all "Child"s in json format , this function is never used
  try {
    res.status(200).json(await getAllChildQuery());
  } catch (err) {
    //console.log(err);
    if (err instanceof ConnectionError)
      res.status(503).send("somthing was  wrong with the database");
  }
}

async function deleteChildByID(req, res) {
  //deletes a "Child" with the give "id"
  try {
    const { childid } = req.params;
    await deleteChildQuery({ id: childid });
    res.status(200).send(`${childid} deleted successful`);
  } catch (err) {
    if (err instanceof InputRequire) res.status(403).send("ID required");
    if (err instanceof WrongKey) res.status(409).send("this ID doesn't exist");

    if (err instanceof ConnectionError)
      res.status(503).send("This is probable a database issue");
  }
}

async function getChildByID(req, res) {
  //make a response with the "Child" that match with the given "id", in json format

  try {
    const { id } = req.body;
    const child = await getChildByIDQuery({ id });

    res.status(200).json(child);
  } catch (err) {
    if (err instanceof InputRequire) res.status(403).send("ID required");
    if (err instanceof WrongKey) res.status(409).send("this ID doesn't exist");
    if (err instanceof ConnectionError)
      res.status(503).send("This is probable a database issue");
  }
}

module.exports = {
  createChild,
  getAllChild,
  deleteChildByID,
  getChildByID,
};
