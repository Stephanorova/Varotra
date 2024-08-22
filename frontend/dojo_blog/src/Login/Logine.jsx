
import { useEffect, useState } from 'react'
import'./Logine.css'
import { useHistory } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { LoginAuth } from '../ReduxAuthanticication/Authantification'

const Logine = () => {

    const [afficher,setAficher]= useState(false)
    const clic = ()=>{
      setAficher(!afficher)
    }

    const [register,setRegister] = useState({
      Email : "",
      Password : "",
    })

    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogin = (e)=>{
      e.preventDefault()
       dispatch(LoginAuth(register))
    }

    const auth = useSelector(state => state.auth)

    useEffect(()=>{
       if (auth._id) {
        history.push("strip")
       }
    },[auth._id, history.push, dispatch])


 

  return (
    <div className='logine'>
        <div className="cadre">
            <div className="incription">
            <span>Login</span>
            <span onClick={()=>history.push("/registre")}>Inscription</span>
            </div>
            <form className="champe" onSubmit={handleLogin}>
                <input type="email" placeholder='votre email' onChange={(e) =>setRegister({...register, Email: e.target.value})}/>
                <input type={afficher ? "text" : "password"} placeholder='votre password' onChange={(e) =>setRegister({...register, Password: e.target.value})}/>
                <div className="showpassword">
                <input type="checkbox" onChange={clic} checked={afficher}/>
                <span>afficher mot de passe</span>
                </div>
                <button className='valider'>
                   Valider
                </button>
            </form>
          
        </div>
    </div>
  )
}

export default Logine