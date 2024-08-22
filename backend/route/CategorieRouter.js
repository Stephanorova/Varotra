const express = require('express');
const { Categorie } = require('../model/Categorie');
const router = express()



router.get('/', async(req,res)=>{
    const affichage = await Categorie.find() 
    res.send(affichage)
})



router.post('/', async(req,res)=>{
    const categorie = new Categorie({
        Nom : req.body.Nom,
        Couleur : req.body.Couleur
    })
   await categorie.save()
   .then((categorie)=>{
    if (categorie) {
        return res.status(200).json({sucess:true, message:'bien success'})
    } else {
        return res.status(200).json({sucess:false, message:'filed categorie'})
    }
   })
})

router.delete('/:_id', async(req,res)=>{
   await Categorie.findByIdAndDelete(req.params._id)
   .then((supprimer)=>{
    if (supprimer) {
        return res.status(200).json({success: true, message:"suppression bien success"})
    } else {
        return res.status(200).json({success: false, message:"erreur de suppression"})
    }
   })
   .catch(err =>{
     res.status(404).json(err)
   })
})



module.exports=router;
