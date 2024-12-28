const ERROR_RESPONSE = require("../utils/handleError")
const USER_MODEL = require("../model/user.model");
const { query } = require("express");

module.exports.findUserDetails = async(query,res)=>{
    try{
        const user = await USER_MODEL.findOne(query);
        return user;
    }catch(error){
        ERROR_RESPONSE(res,error);
    }
}

module.exports.findUserAndUpdate = async(query,update,options,res)=>{
    try{
        const user = await USER_MODEL.findOneAndUpdate(query,update,options,res);
        return user;
    }catch(error){
        ERROR_RESPONSE(res,error);
    }
}