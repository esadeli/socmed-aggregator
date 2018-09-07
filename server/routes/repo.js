'use strict'

const express = require('express');
const router = express.Router();
const RepoController = require('../controllers/repo')

// get list of starred repos that is in user's repository and or starred by user
router.get('/',(req,res)=>{
    RepoController.getStarredData(req,res)
})

// get list of starred repos that is in user's repository and or starred by user 
// and filter by the owner of repo (i.e. github username)
router.post('/searchNameRepo',(req,res)=>{
    RepoController.getStarredDataByNameOfRepo(req,res);
})

// create a new repo on behalf of user's account
router.post('/create',(req,res)=>{
    RepoController.createIndividualRepo(req,res);
})

// search repository by username / owner
router.post('/search/',(req,res)=>{
    // console.log('TEST 1')
    RepoController.getRepoByUsername(req,res);
})

// unstar the repository of someone's git
router.delete('/unstar',(req,res)=>{
    RepoController.unstarRepository(req,res);
})

module.exports = router