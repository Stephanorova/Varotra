
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')
const Produit = require("./route/ProduitRouter")
const categorie = require("./route/CategorieRouter")
const user = require('./route/UserRouter')
const login = require('./route/Login')
const payment = require('./route/PaymentStrip')
// const SecuritAPI = require('./securiteAPI/jwt')



//configue midleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(SecuritAPI)

// API

app.use("/api/produit", Produit)
app.use("/api/categorie", categorie)
app.use("/api/user", user)
app.use("/api/login", login)
app.use("/api/stripe", payment)





//serveur
const port = process.env.PORT || 5000
app.listen(port,console.log(`http://localhost:${port}`))






//connexion
const url = process.env.db_name;

mongoose.connect(url,{})
.then(()=>{
    console.log('connexion a la base success');
})
.catch((err)=>{
    console.log(err);
})



