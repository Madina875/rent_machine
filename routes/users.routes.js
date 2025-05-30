const {
  add,
  getAll,
  getById,
  remove,
  update,
  findUsersMachineByTime,
  findUsersByName,
  findUsersByCategory,
} = require("../controllers/users.controller");
const router = require("express").Router();

router.post("/", add);
router.post("/bytime", findUsersMachineByTime);
router.post("/byname", findUsersByName);
router.post("/bycategory", findUsersByCategory);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", remove);
router.post("/:id", update);

module.exports = router;
