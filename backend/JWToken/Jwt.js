const jwt = require("jsonwebtoken")

const AuthToken = (user)=>{
    const secretkey = process.env.SECRET_KEY;

    const token = jwt.sign({
        _id: user._id,
        Nom: user.Nom,
        Email: user.Email
    },
    secretkey
    )
    return token
    
}
module.exports = AuthToken;