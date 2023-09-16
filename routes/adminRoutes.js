const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authRoutes = require("./authRoutes");
const  {verifyUser,isLoggedIn, isAdmin}= require('../middleware/authMiddware')
const getAllEmployeesDataByCompany = require("../controllers/adminController");

//router.use('/', authRoutes)

// Protect all routes after this middleware
router.use(isLoggedIn);


router.use(isAdmin)

router.route('/dashboard').
get(getAllEmployeesDataByCompany)

module.exports = router