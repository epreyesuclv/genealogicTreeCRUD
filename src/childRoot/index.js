const { Router } = require("express");
const { verifyingToken } = require("../auth/authToken");
const { getChildByID, deleteChildByID, createChild } = require("./child_CRUD");
const router = Router();

router.get("/:childid", getChildByID);
router.delete("/:childid",verifyingToken, deleteChildByID);
router.post("/child" ,verifyingToken, createChild);


module.exports = router