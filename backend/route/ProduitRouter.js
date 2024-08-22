const express = require('express');
const { Produit } = require('../model/Produit');
const { Categorie } = require('../model/Categorie');
const router = express.Router()
const multer = require('multer')


const typeImage = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const valider = typeImage[file.mimetype]
        let errorType = new Error('invalide image type')
        if (valider) {
            errorType = null;
        }
        cb(errorType, 'Image')
    },
   filename: function (req, file, cb) {
       const filName = file.originalname.split(' ').join('-')
       cb( null, `${filName}`)
   }
})

const uploadImage = multer({storage: storage})

  router.get('/', async(req,res)=>{

    try {
        const produit =  await Produit.find().select('-__v').populate('categorie',' -__v')
        .then((Produit)=>{
            return res.status(200).send(Produit)
        })
        .catch((err) =>{
            console.log(err);
        })

    } catch (error) {
        console.log(error);
    }
})

router.get('/:_id', async(req,res)=>{
    Produit.findById(req.params._id).populate('categorie')
        .then((Produit)=>{
            return res.status(200).send(Produit)
        })
        .catch((err) =>{
            console.log(err);
        })
})




router.post('/',uploadImage.single('image') , async(req,res)=>{

        await Categorie.findById(req.params.categorie)

        const file= req.file
        if (!file) {
            return res.status(404).send({message:'aucune image selectioné'})
        }
        
        const filName = req.file.filename;
        const pathImage = `${req.protocol}://${req.get('host')}/Image/`;
        

            const produit = new Produit({
                Nom : req.body.Nom,
                Prix : req.body.Prix,
                Degre : req.body.Degre,
                image : `${pathImage}${filName}`,
                categorie: req.body.categorie,
            })

                await produit.save()
                    .then((produit)=>{
                        if (produit) {
                            return res.status(200).json({success: true, message: "bien success"})
                        } else {
                            return res.status(200).json({success: false, message: "erreur ajout de produit"})
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                    })
            })

router.delete('/:_id', async(req, res)=>{
    await Produit.findByIdAndDelete(req.params._id)
    .then((produit)=>{
        if (produit) {
            return res.status(200).json({success:true, message:"bien success"})
        } else {
            return res.status(200).json({success:false, message:"filed!!!"})
        }
    })
})

router.get("/count", async(req,res)=>{
    const InfoCounte =  await Produit.countDocuments(parseInt((count)=> count))
  
     if (!InfoCounte) {
          return res.status(404).json({message:"information dined!!!"})
     }
     res.send({
       count: InfoCounte
      })
  })


module.exports=router;