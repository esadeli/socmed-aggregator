'use strict'

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/loginFb',(req,res)=>{
    // res.status(200).json({data: "Testt"})
    // console.log('TESTT')
    UserController.loginFB(req,res)
})


module.exports = router