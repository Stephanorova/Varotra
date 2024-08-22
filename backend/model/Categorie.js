const mongoose = require('mongoose')


const CategorieSchema= new mongoose.Schema(
    {
        Nom:{
            type:String,
            required:true
        },
        Couleur:{
            type:String,
            required:true
        },
    }
)

const Categorie = mongoose.model('Categori', CategorieSchema)

exports.Categorie = Categorie;