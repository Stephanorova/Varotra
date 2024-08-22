const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    Nom:{
        type:String,
        required: true
    },
    Prenom:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true
    },
    Password:{
        type:String,
        required: true
    },
})

const User = mongoose.model('User', UserSchema)
exports.User = User;