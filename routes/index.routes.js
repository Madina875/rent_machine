const categoryRouter = require("./category.routes");
const commissionRouter = require("./commission.routes");
const districtRouter = require("./district.routes");
const imageRouter = require("./image.routes");
const regionRouter = require("./region.routes");

const router = require("express").Router();

router.use("/category", categoryRouter);
router.use("/commission", commissionRouter);
router.use("/district", districtRouter);
router.use("/image", imageRouter);
router.use("/region", regionRouter);

module.exports = router;
