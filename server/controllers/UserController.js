'use strict'

const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;
const axios = require('axios')
const jwt = require('jsonwebtoken');

class UserController {

    //register biasa
    static createUser(req,res){
        inputName = req.body.name;
        inputEmail = req.body.email;
        inputPassword = req.body.password;

        User.create({name : inputName, email : inputEmail, password : inputPassword})
        .then(user =>{
            jwt.sign({
                name: inputName,
                email : inputEmail
            },process.env.SECRET,(err,token)=>{
                if(err){
                    res.status(500).json({
                        msg : err
                    })
                }else {
                    res.status(200).json({
                        msg : 'Register berhasil',
                        token : token
                    })
                }
            })

            res.status(200).json({msg : 'Data has been saved'});
            // console.log('Data has been saved');
        })
        .catch(err =>{
            // console.log('err');
            res.status(500).json({msg : err});
        })

    }

    // login/register via FB
    static loginFB(req,res){
        let authResponse = req.body.token;
        // console.log('TEST',authResponse);
        let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse}`
        // console.log('TEST',authResponse)
        axios({
                method: "GET",
                url: url_user_info
        })
        .then((user)=>{
            // console.log(user.data)
            let inputName = user.data['name']
            let inputEmail = user.data['email']
            // console.log('SUKSES',email);
            //check if user's exist
            User.findOne({email: inputEmail}, (err,data) =>{ 
                // console.log('TEST NULL--->',data)
                if(data===null){        
                    // // console.log('TEST NULL 2--->',data)
                    User.create({
                        name : inputName, 
                        email : inputEmail,
                        password : 'default123'
                    },(err,data)=>{
                        if(err){
                            res.status(500).json({msg : err});
                        }else{
                            // console.log('SAVE SUKSES') 
                            jwt.sign({
                                name: user.data['name'],
                                email :user.data['email']        
                            },process.env.SECRET,(err,token)=>{
                                if(err){
                                    res.status(500).json({msg : err})
                                }else{
                                    // console.log('TEST login create',token)
                                    res.status(200).json({
                                        msg : 'Sign in sukses',
                                        token : token
                                    });
                                }
                            })
                        }
                    })
                }else if(data){
                    // console.log('TEST 2--->',data)
                    jwt.sign({
                        name: user.data['name'],
                        email :user.data['email']
                    },process.env.SECRET,(err,token)=>{
                        if(err){
                            res.status(500).json({ msg : err})
                        }else{
                            // console.log('TEST login',token)
                            res.status(200).json({
                                msg : 'Sign in sukses',
                                token : token
                            });
                        }
                    })
                }else{
                    console.log("ERR",err);
                    res.status(500).send(err)
                }});
        })
        .catch((err)=>{
            // console.log('FAIL',err);
            res.status(500).json({msg : err})
        })  
    }
}

// UserController.createUser('Anda','anda@email.com');

module.exports = UserController