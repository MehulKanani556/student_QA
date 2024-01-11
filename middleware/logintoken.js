var jwt = require('jsonwebtoken');
exports.check = async(req,res,next)=>{
    jwt.verify(req.headers.authorization, 'mehul',next);
}