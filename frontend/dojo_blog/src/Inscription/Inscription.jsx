import { useDispatch, useSelector } from 'react-redux';
import'./Inscription.css'
import {useHistory} from "react-router-dom"
import { useState } from 'react';
import { registerAuth } from '../ReduxAuthanticication/Authantification';

const Inscription = () => {
  const [register,setRegister] = useState({
    Nom : "",
    Prenom : "",
    Email : "",
    Password : "",
  })
  const history = useHistory()
 const dispatch = useDispatch()
 const auth = useSelector(state => state.auth)
 console.log(auth);

  const handleRegistre = (e) =>{
     e.preventDefault()
     history.push("/logine")
     dispatch(registerAuth(register))
  }

  return (
    <div className='inscription'>
    <div className="cadrage">
        <div className="incriptions">
        <span  onClick={()=>history.push("/logine")}>Login</span>
        </div>
        <form className="champeregistre" onSubmit={handleRegistre}>
            <input type="text" placeholder='votre nom' onChange={(e)=>setRegister({...register, Nom: e.target.value})}/>
            <input type="text" placeholder='votre prénom' onChange={(e)=>setRegister({...register, Prenom: e.target.value})}/>
            <input type="email" placeholder='votre email'onChange={(e)=>setRegister({...register, Email: e.target.value})}/>
            <input type="password" placeholder='votre password'  onChange={(e)=>setRegister({...register, Password: e.target.value})}/>
        <div className="button">
            <button >
               Enregistrer
            </button>
        </div>
        </form>
    </div>
</div>
  )
}

export default Inscription