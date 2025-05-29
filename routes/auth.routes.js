const {
  // add,
  // getAll,
  // getById,
  // remove,
  // update,
  login,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/logout", logout);
// router.get("/:id", getById);
// router.delete("/:id", remove);
router.post("/refresh", refreshToken);

module.exports = router;
