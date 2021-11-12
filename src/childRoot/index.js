const { Router } = require("express");
const { verifyingToken } = require("../middelwares/verifyingToken");
const { getChildByID, deleteChildByID, createChild } = require("../child_CRUD");
const router = Router();
//routes
router.get("/:childid", getChildByID);
//routes that need token validation
router.delete("/:childid", verifyingToken, deleteChildByID);
router.post("/child", verifyingToken, createChild);

module.exports = router;
