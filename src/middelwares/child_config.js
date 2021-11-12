const { getPersonByIDQuery } = require("../fetchData/personQuerys");


//you can access to one child as follow
//http://localhost/person/[person_id]/[child_id]
//this middelware check if the person_id exist, and the pass it to the next handler

async function childConfig(req, res, next) {
  const { personid } = req.params;
  try {
    await getPersonByIDQuery({ id: personid });
  } catch (err) {
    res.status(404).send("user not found");
  }

  req.personID = personid;

  //console.log("authToken " , req.user)
  next();
}

module.exports = {
  childConfig,
};
