const express = require("express")
require("dotenv/config")
const router = express.Router()

const Stripe = require('stripe')




const stripe = Stripe(process.env.CLET_KEY)

router.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.Itemes.map(item => {
        return(
               {
                  price_data: {
                   currency: 'usd',
                   product_data: {
                      name: item.Nom,
                      Image: [item.Image],
                      metadata:{
                        id: item._id
                      }
                    },
                    unit_amount: item.Prix * 100,
                    },
                 quantity: item.quantiteProduit,
              }
            )

    })

      const session = await stripe.checkout.sessions.create({
          line_items,
          mode: 'payment',
              success_url: `${process.env.URL_client}/checkout-session`,
              cancel_url: `${process.env.URL_client}/achat`,  
      });
      res.send({url: session.url})
});
// router.post ('/create-checkout-session', async (req,res)=>{
//    const line_items = req.body.cartIteme.map( item =>{
//      return(
//              {
//      price_data: {
//       currency: 'usd',
//       product_data: {
//          Nom: item.Nom,
//          Degre: item.Degre,
//        },
//        unit_amount: item.Prix * 100,
//        },
//     quantity: item.quantiteProduit,
//  }
//     )
//   })
//     const  session = await stripe.checkout.sessions.create({
//       line_items //   : [
//           //   {
              
//           //       price_data: {
//           //         currency: 'usd',
//           //         product_data: {
//           //           name: "T-shirt",
//           //         },
//           //         unit_amount: 1000,
//           //       },
//           //       quantity: 1,
              
//           //   },
//           // ]
//           ,
//             mode: 'payment',
//             success_url: `${process.env.URL_client}/checkout-session`,
//             cancel_url: `${process.env.URL_client}/achat`,  
//     });
  //  res.send({url: session.url})
//})
 

    

module.exports = router;

