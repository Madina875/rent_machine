const categoryRouter = require("./category.routes");
const commissionRouter = require("./commission.routes");
const districtRouter = require("./district.routes");
const imageRouter = require("./image.routes");
const regionRouter = require("./region.routes");
const userRouter = require("./users.routes");
const statusRouter = require("./status.routes");
const machineRouter = require("./machine.routes");
const roleRouter = require("./role.routes");
const user_roleRouter = require("./user-role.routes");
const authRouter = require("./auth.routes");
const contractRouter = require("./contract.routes");
const paymentRouter = require("./payment.routes");
const reviewRouter = require("./review.routes");
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
router.use("/role", roleRouter);
router.use("/urole", user_roleRouter);
router.use("/author", authRouter);
router.use("/payment", paymentRouter);
router.use("/review", reviewRouter);
router.use("/contract", contractRouter);
router.use("/usersl", users_locationRouter);

module.exports = router;
