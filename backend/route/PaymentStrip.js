const express = require("express")
require("dotenv/config")

const Stripe = require('stripe')

const router = express.Router()


const stripe = Stripe(process.env.CLET_KEY)

router.post ('/create-checkout-session', async (req,res)=>{
  const line_items = req.body.cartIteme.map((item)=>{
    return(
      {
        price_data: {
          currency: '$',
          product_data: {
            Nom: item.Nom,
            image: item.image,
            Degre: item.Degre,
          },
          unit_amount: item.Prix * 100,
        },
        quantity: item.Quantite,
      }
    )
  })
    const  session = await stripe.checkout.sessions.create({
            line_items ,
            mode: 'payment',
            success_url: `${process.env.URL_client}/checkout-session`,
            cancel_url: `${process.env.URL_client}/achat`,  
    });
    res.send({url: session.url})
})
 

    

module.exports = router;

