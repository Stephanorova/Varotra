const mongoose = require('mongoose')


const ProduitSchema = new mongoose.Schema({
    Nom:{
        type: String,
        required: true
    },
    Prix:{
        type: Number,
        required: true
    },
    Degre:{
        type: String,
        required: true
    },
    image:{
        type:String,
        default:''
    },
    categorie:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Categori",
        required: true
    },
    date:{
        type: Date,
        default:Date.now
    }
})

const Produit = mongoose.model('Produit', ProduitSchema)
exports.Produit = Produit;