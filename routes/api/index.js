const express = require('express');

const animalRouter = require('./animals');

const router = express.Router();

router.use('/animals', animalRouter);
// router.use('/users', userRouter);
module.exports = router;
