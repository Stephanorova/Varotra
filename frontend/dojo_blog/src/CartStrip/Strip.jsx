import'./Strip.css'
import NavigateNextIcons from "@mui/icons-material/NavigateNext"
import BackspaceIcons from "@mui/icons-material/Backspace"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import { Abandoner } from '../ReduxAuthanticication/Authantification'
import axios from 'axios'


const url = 'http://localhost:5000/api/stripe/'

const Strip = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)


  const handleQuite = ()=>{
      dispatch(Abandoner())
      history.push("/logine")
  }

  const handleAcheter = ()=>{    
     axios.post(`${url}create-checkout-session`,{
           Itemes : cart.cartIteme,
           UserId: user._id
    }).then((res)=>{
       if (res.data.url) {
         window.location.href = res.data.url
       }
     }).catch((error)=> console.log(error.message))
  }

  return (
    <div className="contenair">
      <button className="strip" onClick={()=>handleAcheter()}>
        acheté cette produit avec strip 
           --<NavigateNextIcons/>
      </button>
      <button className="abandoner" onClick={()=>handleQuite()}>
        <BackspaceIcons/> 
        abandoné
      </button>
    </div>
  )
}

export default Strip