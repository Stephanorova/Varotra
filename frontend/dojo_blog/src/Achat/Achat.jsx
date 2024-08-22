import'./Achat.css'
import { useEffect } from 'react'
import {useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Addcart, CalculPrixQuantite, quantiteAction, supprimerAchat, supprimerTous } from '../ReduxCart/EnregistrerCart'
import CloseIcons from "@mui/icons-material/Close"




const Achat = () => {

    const history = useHistory()
    const cart = useSelector(state => state.cart)

     const dispatch = useDispatch()

     const removeAchat = (produit)=>{
         dispatch(supprimerAchat(produit))
     }

     const decendreAchat = (produit)=>{
        dispatch(quantiteAction(produit))
     }
     const plusAchat = (produit)=>{
      dispatch(Addcart(produit))
   }
   const claire = ()=>{
    dispatch(supprimerTous())
   }

   useEffect(()=>{
      dispatch(CalculPrixQuantite())
   },[cart, dispatch])

  return (
        <div className='achat'>
          {
            cart.cartIteme.length === 0 ?
            (
                <div style={{flex:"5",display:"flex",
                alignItems:"center", justifyContent:"center",
                flexDirection:"column",
                padding:"30px", width:"100%",
                color:"tomato",
                fontWeight:"bold"
                }

            }>
            <h3>Porte Fueille vide, vous ne faisiez pas l' achat</h3>
               <span style={{color:"gray"}}>alors cliqué le bouton  retour pour acheté</span>
                 <button
                   style={{
                    width:"130px",
                     height:"40px"
                         }}
                      onClick={()=>history.push("/")}>retour</button>
                       </div>
            )
            :
            (
            <div className="achatdroite">
                <div className="heade">
                  <div className="headertable">
                    <span>Image</span>
                    <span>% et Nom</span>
                    <span>Prix</span>
                    <span>Quantité</span>
                    <span>Totale</span>
            </div>
            <hr />
            </div>

            <div className="listeProduitAchat">
              {cart.cartIteme?.map(produit => (
                <div className="cadreproduit" key={produit._id}>
              <img src="/image/FB_IMG_17138943893086770.jpg" alt="image" className='imageAchat'/>
              <span className='pourcent'>
                <i>{produit.Nom}</i>
                <i>{produit.Degre}%</i>
                <i className='closeCart' onClick={()=>removeAchat(produit)}><CloseIcons/></i>
              </span>
              <span>{produit.Prix} Ar</span>
              <span className='action'>
                <p onClick={()=>decendreAchat(produit)}>-</p>
                <input type="text" value={produit.quantiteProduit}/>
                <p onClick={()=>plusAchat(produit)}>+</p>
              </span>
              <span>
                  {produit.Prix * produit.quantiteProduit} Ar
              </span>
            </div>
          ))}
            </div>
            <button onClick={()=>claire()}  style={{width:"200px", height:"40px", background:"tomato", color:"white", fontSize:"15px"}}>supprimer tous</button>
        </div>
        )
          }


            <div className="achatgauche">
                <div className="payement">
                    <h3>Mode payement par Cart</h3>
                </div>
                    <div className="PrixTotal">
                    <h4>Prix total:</h4>
                    <div className="cadrePrix">
                        <h4>{cart.PrixTotale} Ar</h4>
                    </div>
                </div>

                <div className="phrage" >
                    <i>Pour acheter cliquez-vous sur boutton continuer et inscrivez si vous n'a pas encors de compte avant d'accepter votre achat</i>
                </div>
                <div className="buttonBas">
                <div className="buttoAchat" >
                    <label onClick={()=>history.push("/logine")}>Continuer l'achat</label>
                  </div>
                </div>
            </div>
        </div>
      )
    }

export default Achat