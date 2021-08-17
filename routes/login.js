const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(cookieParser())

module.exports = router;
