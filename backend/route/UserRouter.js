const express = require("express")
const router = express.Router()
const Joi = require("joi")
const bcrypt = require("bcrypt")
const { User } = require("../model/Registre")
const AuthToken = require("../JWToken/Jwt")


router.post("/", async(req,res)=>{
    const Schema = Joi.object({
        Nom : Joi.string().min(3).max(100).required(),
        Prenom : Joi.string().min(3).max(100).required(),
        Email : Joi.string().min(3).max(100).required().email(),
        Password : Joi.string().min(3).max(100).required(),
    })

    const {error} = Schema.validate(req.body)

    if (error) {
        res.status(400).send("erreur de validation schema")
    }

    let user = await User.findOne({Email : req.body.Email})

    if (user) {
        res.status(400).send("Admine existe deja !!!")
    }


  user = new User({
    Nom : req.body.Nom,
    Prenom : req.body.Prenom,
    Email : req.body.Email,
    Password : req.body.Password,
  })

  const salt = await bcrypt.genSalt(10)
  user.Password = await bcrypt.hash(user.Password,salt)

  user = await user.save()

 const token = AuthToken(user)

res.send(token)

})

module.exports= router;