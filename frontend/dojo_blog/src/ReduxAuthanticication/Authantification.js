import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import jwtDecode from "jwt-decode"



const initialState = {
    token: localStorage.getItem("token"),
    Nom:"",
    Prenom:"",
    Email:"",
    _id:"",
    registerStatus: "",
    registerError:"",
    LoginStatus:"",
    LoginError:"",
    registerLoader: false,
}

export const registerAuth = createAsyncThunk(
    'auth/registerAuth',
   async (register,{rejectWithValue})=>{
        try {
         const token = await axios.post("http://localhost:5000/api/user",{
                Nom: register.Nom,
                Prenom: register.Prenom,
                Email: register.Email,
                Password: register.Password,
            })
       localStorage.setItem("reponse", token.data)
       return token.data

        } catch (error) {
           return rejectWithValue(error.reponse.data)
        }
    }
)

export const LoginAuth = createAsyncThunk(
    'auth/LoginAuth',
   async (register,{rejectWithValue})=>{
        try {
         const reponse = await axios.post("http://localhost:5000/api/login",{
            Email: register.Email,
            Password: register.Password,
            })
       return reponse.data

        } catch (error) {
           return rejectWithValue(error.reponse.data)
        }
    }
)

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        registerLoader(state,action){
            const token = state.token

            if (token) {
                const register = jwtDecode(token)

                return{
                    ...state,
                    token: action.payload,
                    _id:register._id,
                    Nom: register.Nom,
                    Prenom: register.Prenom,
                    Email: register.Email,
                    Password: register.Password,
                    registerLoader: true,
                }
            }
        },
        Abandoner(state,action){
          localStorage.removeItem("token")

          return{
            ...state,
            token:"",
            Nom:"",
            Prenom:"",
            Email:"",
            _id:"",
            registerStatus: "",
            registerError:"",
            LoginStatus:"",
            LoginError:"",
            registerLoader: false,
          }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(registerAuth.pending,(state,action)=>{
               return {
                ...state,
                registerStatus:"pending"
               }
        });
        builder.addCase(registerAuth.fulfilled,(state,action)=>{
              if (action.payload) {
                 const register = jwtDecode(action.payload) 

                 return {
                    ...state,
                    token: action.payload,
                    _id:register._id,
                    Nom: register.Nom,
                    Prenom: register.Prenom,
                    Email: register.Email,
                    Password: register.Password,
                    registerStatus: "success"
                 }
              } else {
                return state
              }
        });
        builder.addCase(registerAuth.rejected,(state,action)=>{
               return {
                ...state,
                registerError:"rejected"
               }
        });


        builder.addCase(LoginAuth.pending,(state,action)=>{
            return {
             ...state,
             LoginStatus:"pending"
            }
     });
     builder.addCase(LoginAuth.fulfilled,(state,action)=>{
           if (action.payload) {
              const register = jwtDecode(action.payload) 

              return {
                 ...state,
                 token: action.payload,
                 _id:register._id,
                 Email: register.Email,
                 Nom: register.Nom,
                 Password: register.Password,
                 LoginStatus: "success"
              }
           } else {
             return state
           }
     });
     builder.addCase(LoginAuth.rejected,(state,action)=>{
            return {
             ...state,
             LoginError:"rejected"
            }
     });
    }
})


export const {registerLoader, Abandoner} = AuthSlice.actions;
export default AuthSlice.reducer;