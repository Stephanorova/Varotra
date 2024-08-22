
import "./NaveBare.css"
import PersonIcons from "@mui/icons-material/Person"
import ShoppingCartIcons from "@mui/icons-material/ShoppingCart"
import HomeIcons from "@mui/icons-material/Home"
import {useHistory} from "react-router-dom"
import { useSelector } from "react-redux"




const Navebare = () => {

  const {Quantite} = useSelector(state => state.cart)
  const history = useHistory()

  
  return (
    <div className="Navebare">
      <div className="droite">
        <img src="./image/Logo.png" alt="" />
      </div>
      <div className="gauche">
        <div className="icons">
        <span className="Inscrire" onClick={()=>history.push("/")}>
            <HomeIcons/>
            <span>Accueil</span> 
         </span>
         <span className="Inscrire" >
            <PersonIcons/>
            <span>
              <select className="select">
                <option onClick={()=>history.push("/logine")} >Login</option>
                <option onClick={()=>history.push("/registre")}  >Inscrire</option>
              </select>
            </span> 
         </span>
         <span className="achat"  onClick={()=>history.push("/achat")}>
         <ShoppingCartIcons style={{cursor:"pointer"}}/>
         <span style={{cursor:"pointer"}}>Achat</span>
         <p className="liste">{Quantite}</p>
         </span>
         </div>
      </div>
    </div>
  )
}

export default Navebare