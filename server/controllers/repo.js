'use strict'

// const Repo = require('../models/repos');
const request = require('request')

class RepoController{

    // search repository by username
    static getRepoByUsername(req,res){
        const options = {
            url: `https://api.github.com/users/${req.body.username}/repos`,
            headers : {
                'User-Agent' : 'request',
                Authorization : 'token '+process.env.TOKEN           
            }
        }
        request.get(options,(err,response,body)=>{
            if(err){
                res.status(500).json({msg : err})
            }else{
                let data = JSON.parse(body);
                let sortedArr = []
                let regex = new RegExp(`${req.body.username}`,'i');

                data.forEach(repo => {
                    // console.log('TEST',regex.test(repo['owner']['login']))
                    if(regex.test(repo['owner']['login'])){
                        sortedArr.push(repo)
                    }
                });

                res.status(200).json({
                    msg : `Search repository with username: ${req.body.username}`,
                    data : sortedArr
                })
            }
        })
    }

    // get starred data
    static getStarredData(req,res){    
        const options = {
            url: 'https://api.github.com/user/starred',
            headers :{
                'User-Agent' : 'request',
                Authorization : 'token '+ process.env.TOKEN
            }
        };

        request.get(options,(err,response,body)=>{
            if(err){
                res.status(500).json({ msg : err});
            }else{
                res.status(200).json({
                    msg : 'List of Repo',
                    data : JSON.parse(body)
                });
            }
        });
    }  

    // get starred data by name of Repo
    static getStarredDataByNameOfRepo(req,res){
        
        const options = {
            url : 'https://api.github.com/user/starred',
            headers : {
                'User-Agent' : 'request',
                Authorization : 'token '+ process.env.TOKEN
            }
        }
        request.get(options,(err,response,body)=>{
            if(err){
                res.status(500).json({ msg : err});
            }else{
                let data = JSON.parse(body);
                let sortedArr = [];

                // console.log('TEST',req.body.description)

                let regex = new RegExp(`${req.body.name}`,'i');

                data.forEach(repo => {
                    if(regex.test(repo['name'])){
                        sortedArr.push(repo)
                    }
                });

                res.status(200).json({ 
                    msg : `List starred Repo with name like: ${req.body.name}`,
                    data : sortedArr
                })
            }
        });
    }

    static createIndividualRepo(req,res){

        const options = {
            url : 'https://api.github.com/user/repos',
            headers : {
                'User-Agent' : 'request',
                Authorization : 'token '+ process.env.TOKEN
            }
        }
        options.body = JSON.stringify({
            name : req.body.name,
            description : req.body.description
        })

        request.post(options,(err,response,body)=>{
            if(err){
                res.status(500).json({ msg : err});
            }else {
                res.status(200).json({
                    msg : `repo ${req.body.name} has been created`,
                    data : JSON.parse(body)
                })
            }
        })

    }

    // unstar a repository
    static unstarRepository(req,res){
        // console.log('TEST',process.env.TOKEN)
        const options = {
            url : `https://api.github.com/user/starred/${req.body.username}/${req.body.repository}`,
            headers : {
                'User-Agent' : 'request',
                Authorization : 'token '+process.env.TOKEN,
                // Accept: 'application/vnd.github.v3.star+json'
            }
        }
        request.delete(options,(err,response,body)=>{
            if(err){
                // console.log('TEST-------------', err)
                res.status(500).json({ msg : err});
            }else{
                res.status(200).json({
                    msg : `Repo ${req.body.repository} has been unstarred`
                })
            }
        })
    }

}

module.exports = RepoController