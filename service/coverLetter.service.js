const { query } = require("express");
const ERROR_RESPONSE = require("../utils/handleError");
const COVER_LETTER_MODEL = require("../model/coverLetter.model");


module.exports.createUpdateCoverLetter = async(query,update,options,res)=>{
    try{
        const coverLetter = await COVER_LETTER_MODEL.findOneAndUpdate(query,update,options,res);
        return coverLetter;
    }catch(error){
        ERROR_RESPONSE(res,error);
    }
}

module.exports.getCoverLetterService = async(query,res)=>{
    try{
       const coverLetter = await COVER_LETTER_MODEL.findOne(query);
       return coverLetter;
    } catch(error){
        ERROR_RESPONSE(res,error);
    }
}

module.exports.deleteCoverLetterService = async(query,res)=>{
    try{
        const coverLetter = await COVER_LETTER_MODEL.findOneAndDelete(query,res);
        return coverLetter;
    }catch(error){
        ERROR_RESPONSE(res,error)
    }
}