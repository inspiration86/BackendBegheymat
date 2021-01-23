const express = require('express');
const router = express.Router();
//setting routes***********************************

const users = require('./userRouter');
router.use('/user',users);

const admin = require('./adminRouter');
router.use('/admin', admin);
const seller = require('./sellerRouter');
router.use('/seller',seller);

module.exports = router;
