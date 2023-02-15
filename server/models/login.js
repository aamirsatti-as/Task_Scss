const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
// const bcrypt =require('bcryptjs');
const LoginSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

});

module.exports = mongoose.model('Login',LoginSchema)