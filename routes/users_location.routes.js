const {
  add,
  getAll,
  getById,
  remove,
  update,
} = require("../controllers/users_location.controller");

const authGuard = require("../guards/auth.guard");
const roleGuard = require("../guards/role.guard");

const router = require("express").Router();

router.post("/", add);
router.get("/", authGuard, roleGuard(["admin", "user"]), getAll);
router.get("/:id", getById);
router.delete("/:id", remove);
router.post("/:id", update);

module.exports = router;
