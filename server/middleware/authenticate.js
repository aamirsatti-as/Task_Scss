const jwt = require('jsonwebtoken');
const Login = require('../models/login')
// const Student = require('../models/studentSchema');

const Authenticate = async (req,res,next)=>{
    try{
        const admin = await Login.findOne({ email: 'aamir@gmail.com', password: 'aamir' });
        console.log(admin)
        const token=admin.tokens[0].token
        const verifyToken = jwt.verify(token,"IAmGeneratingTokenToAuthticateCredintialBelongToUser")
        next();
    }
    catch(err){
        res.json({message:"UnAuthorized User"})
    }
}
module.exports = Authenticate;