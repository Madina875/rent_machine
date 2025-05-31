const {
  add,
  getAll,
  getById,
  remove,
  update,
  findUsersMachineByTime,
  findUsersByName,
  findUsersByCategory,
  findUsersByRegionDistrict,
  findUsersWithMachinesHavingMoreThan3Images,
  findUsersStatus,
} = require("../controllers/users.controller");
const router = require("express").Router();

router.post("/bytime", findUsersMachineByTime);
router.post("/byname", findUsersByName);
router.post("/bycategory", findUsersByCategory);
router.post("/by_rd", findUsersByRegionDistrict);
router.post("/by_i", findUsersWithMachinesHavingMoreThan3Images);
router.get("/by_s", findUsersStatus);

router.post("/", add);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", remove);
router.post("/:id", update);

module.exports = router;
