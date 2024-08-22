import'./ProduitImage.css'
import StarIcons from "@mui/icons-material/Star"
import SecurityIcons  from "@mui/icons-material/Security"
import PaymentIcons  from "@mui/icons-material/Payment"
import CarRepairIcons  from "@mui/icons-material/CarRepair"
import PhoneIcons  from "@mui/icons-material/Phone"
import FlashOnIcons  from "@mui/icons-material/FlashOn"
import FacebookIcons  from "@mui/icons-material/Facebook"
import SearchIcons  from "@mui/icons-material/Search"
import EmailIcons  from "@mui/icons-material/Email"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick'
import { useGetAllProduitQuery } from '../ReduxProduit/API'
import { useDispatch } from 'react-redux'
import { Addcart } from '../ReduxCart/EnregistrerCart'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'








const ProduitImage = () => {

 const[searche,setSearche] = useState("")
  const { data } = useGetAllProduitQuery()

  const dispatch = useDispatch()
  const history = useHistory()

  const handleAcheter = (produits)=>{
        dispatch(Addcart(produits))
        history.push("/achat")
  }



  const settings = {
    dots:true,
    infinite:true,
    speed:600,
    slidesToShow:1,
    slidesToScroll:1,
    autoplay:true,
    appendDots:(dots)=>{
      return <ul style={{margin:"0px"}}>{dots}</ul>
    }
  
  }
  return (
    <div className='tout'>
      <div className="flexend">
      <div className="toutProdui">
      <FlashOnIcons style={{color:"tomato", fontSize:"30px"}}/>
      <div className="frage">
      <span>Tous les Produit</span> 
      <span>Tous ces produits là exite dans nos magasins, alors vous pouvez l'acheté directement dans ce site.</span>
      </div>
     </div>
     <div className="searche">
       <input type="text" onChange={(e)=>setSearche(e.target.value)}/>
       <SearchIcons style={{color:"black", fontSize:"25px"}}/>
     </div>
      </div>
    <div className='produit'>
    {
      data?.filter((val)=>{
        if (val === "") {
          return val
        }else if (val.Nom.toLowerCase().includes(searche.toLowerCase())){
          return val
        }
      }).map((produits)=>(
         <div className="listeProduit" key={produits._id}>
            <img src="/image/FB_IMG_17138943893086770.jpg" alt="" className='imageproduit'/>
            <div className="foote">
            <span>prix : {produits.Prix} Ar</span> 
            <span>{produits.Degre}%</span> 
            </div>
            <div className="nomProduit">
             {produits.Nom}-{produits.categorie.Couleur}
            </div>
            <button className='buttonAchat' onClick={()=>handleAcheter(produits)}>
                Acheter
            </button>
        </div>
      ))
    }
    </div>
    <div className="topCategorie">
      <StarIcons style={{color:"tomato", fontSize:"30px"}}/>
      Top Categogie
    </div>

    <div className="categori">
      <div className="imagedroites">
      <img src="./image/FB_IMG_17193895853488157.jpg" alt="" className="imagedroite"/>
      </div>
    
      <div className="imageSlider">
      <Slider {...settings}> 
        <div>
        <img src="./image/FB_IMG_17138947084925114.jpg" alt="" className="imagegauche"/>
        </div>
        <div>
        <img src="./image/FB_IMG_17138946988868670.jpg" alt="" className="imagegauche"/>
        </div>
        <div>
        <img src="./image/FB_IMG_17193895928746319.jpg" alt="" className="imagegauche"/>
        </div>
      </Slider>
      </div>
    </div>
    
    <div className="mode">
        {
          data?.map(categori =>(
            <div className="paymentconsult" key={categori._id}>
            <img src="/image/FB_IMG_17193895771773281.jpg" alt="" className='imagecategorie'/>
            <div className="nameprod">
                  <p>{categori.categorie.Nom}</p> 
              </div>
            <div className="prixDegre">
              <p>prix: 1000 ar</p> 
                  <p>40%</p> 
                  </div>
              <span onClick={()=>handleAcheter(categori)}>Acheté</span>
            </div>
          ))
        } 
    </div>

    <div className="modepayment">
      <div className="paymentcnsulte">
        <PaymentIcons/>
        <span>Mode payement par Strip, bien securisé</span>
      </div>
      <div className="paymentcnsulte">
        <SecurityIcons/>
        <span>Cette application est en securité, donc n'hesitez pas de faire l'achat</span>
      </div>
      <div className="paymentcnsulte">
        <CarRepairIcons/>
        <span>Nous faisons de livraisons pour faire le satisfaction de notre client</span>
      </div>
      <div className="paymentcnsulte">
        <PhoneIcons/>
        <span>Vous pouvez commander par téléphone mobile sur se numéro en bas</span>
      </div>
    </div>
    <div className="footer">
        <FacebookIcons/>
        <EmailIcons/>
        +261 33 62 122 25
      </div>
    </div>
  )
}

export default ProduitImage