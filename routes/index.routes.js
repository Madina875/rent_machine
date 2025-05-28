const categoryRouter = require("./category.routes");
const commissionRouter = require("./commission.routes");
const districtRouter = require("./district.routes");
const imageRouter = require("./image.routes");
const regionRouter = require("./region.routes");
const userRouter = require("./users.routes");
const statusRouter = require("./status.routes");
const machineRouter = require("./machine.routes");
const users_locationRouter = require("./users_location.routes");

const router = require("express").Router();

router.use("/category", categoryRouter);
router.use("/commission", commissionRouter);
router.use("/district", districtRouter);
router.use("/image", imageRouter);
router.use("/region", regionRouter);
router.use("/users", userRouter);
router.use("/machine", machineRouter);
router.use("/status", statusRouter);
router.use("/usersl", users_locationRouter);

module.exports = router;
