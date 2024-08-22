
const bcrypt = require("bcrypt")
const route = require("express").Router()
const Joi = require("joi");
const { User } = require("../model/Registre");
const AuthToken = require("../JWToken/Jwt");


route.post("/", async(req,res)=>{
   const Schema = Joi.object({
    Email: Joi.string().min(3).max(30).required().email(),
    Password: Joi.string().min(4).max(30).required()
   });

   const {error} = Schema.validate(req.body)

   if (error) {
     return res.status(400).send(error.details[0].message)
   }
   let user = await User.findOne({Email : req.body.Email})

   if (!user) {
    return res.status(400).send("invalide email ou mot de passe...")
   }

   const valider = await bcrypt.compare(req.body.Password, user.Password)
   if (!valider) {
     return res.status(404).send("invalide email ou mot de passe...")
   }
   const token = AuthToken(user)
   res.send(token)
})
module.exports=route;