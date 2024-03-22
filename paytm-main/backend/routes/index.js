const express = required ('express');
const userRouter = require('./user');

// single routing
const router = express.Router();

router.use("/user", userRouter)

module.exports = router;