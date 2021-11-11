
function childConfig(req, res, next) {
  const { personid } = req.params;

  req.personID = personid;

  //console.log("authToken " , req.user)
  next();
}

module.exports = {
  childConfig,
};
