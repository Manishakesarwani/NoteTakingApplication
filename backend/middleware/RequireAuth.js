const jwt = require("jsonwebtoken");
const UserModel = require("../NotesModel/UserModel");

const RequireAuth = async(req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({msg: "Authorization Required!"});
    }

    // console.log(authorization)

    let token = authorization.split(" ")[1];

    try{
        const {_id} = jwt.verify(token, process.env.SECRET_KEY);

        req.user=await UserModel.findOne({_id}).select('_id, Email');
        next();
    }
    catch(e){
        return res.status(401).json({error: e.message});
    }
}

module.exports=RequireAuth