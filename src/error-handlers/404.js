'use strict';
module.exports=(req,res)=>{
   res
   .status(404)
   .json({
       error:404,
       path:req.path,
       messeage:'not found'
   });    
}