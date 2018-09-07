'use strict'
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const UserRouters = require('../server/routes/UserRoutes');
const RepoRoutes = require('./routes/repo')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/socmed');

app.use(express.urlencoded({extended : false}));
app.use(express.json())
app.use('/user',UserRouters);
app.use('/repos',RepoRoutes);
app.use(cors());


app.get('/',(req,res)=>{
    res.send('ok');
})


app.listen(3000,()=>{ 
    console.log('Listen to port 3000')
})
