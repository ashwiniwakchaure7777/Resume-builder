const ERROR_RESPONSE = require("../utils/handleError")
const USER_MODEL = require("../model/user.model");

module.exports.findUserDetails = async(query,res)=>{
    try{
        const user = await USER_MODEL.findOne(query,res);
        return user;
    }catch(error){
        ERROR_RESPONSE(res,error);
    }
}