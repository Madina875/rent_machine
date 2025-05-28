const {
  add,
  getAll,
  getById,
  remove,
  update,
} = require("../controllers/image.controller");

const router = require("express").Router();

router.post("/", add);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("./:id", remove);
router.post("/:id", update);

module.exports = router;
