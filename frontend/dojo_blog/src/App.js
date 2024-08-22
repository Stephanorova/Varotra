

import"./App.css"
import Navebare from "./NaveBare/Navebare"
import { BrowserRouter, Route,Switch} from "react-router-dom"
import Accueil from "./componante/Accueil"
import Logine from "./Login/Logine"
import Inscription from "./Inscription/Inscription"
import Achat from "./Achat/Achat"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Strip from "./CartStrip/Strip"
import NotFounde from "./NotFound/NotFounde"
import Success from "./SuccessFull/Success"



export default function App() {


  return(
    <div className="App">
      <BrowserRouter>
         <Navebare/>
         <ToastContainer/>
          <Switch>
             <Route path="/" exact component = {()=><Accueil/>} />
             <Route path="/logine"  component = {()=><Logine/>} />
             <Route path="/registre"  component = {()=><Inscription/>} />
             <Route path="/achat"  component = {()=><Achat/>} />
             <Route path="/strip"  component = {()=><Strip/>} />
             <Route path="/checkout-session"  component = {()=><Success/>} />
             <Route path="*"  component = {()=><NotFounde/>} />
          </Switch>
      </BrowserRouter>
    </div>
  )
}