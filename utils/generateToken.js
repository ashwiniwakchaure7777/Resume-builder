const jwt = require('jsonwebtoken');

module.exports.generateToken = async(user)=>{
    try{
        const token = await jwt.sign(user,process.env.JWT_SECRET_KEY,{expiresIn:'7d'});
        
        const cookieName = user.role;

        res.status(200).cookie(cookieName,token);
        
    }catch(error){
        return res.status(500).json({success:false,message:"false",error})
    }
}