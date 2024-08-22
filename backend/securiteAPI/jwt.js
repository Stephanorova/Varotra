

const jwtSecurite = require(express-jwt)

const authJWT = ()=>{
    const secretkey = process.env.SECRET_KEY;
    
    return jwtSecurite({
        secretkey
    })
}

module.exports=authJWT;