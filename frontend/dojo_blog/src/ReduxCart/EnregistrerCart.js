
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    cartIteme : localStorage.getItem("cartIteme") ? JSON.parse(localStorage.getItem("cartIteme")) : [],
    Quantite : 0,
    PrixTotale : 0,
}


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        Addcart(state,action){
            const cartIndex  = state.cartIteme.findIndex(item => item._id === action.payload._id)

            if (cartIndex >= 0) {
                state.cartIteme[cartIndex].quantiteProduit += 1
            } else {
                const QA = {...action.payload, quantiteProduit: 1}
                state.cartIteme.push(QA) 
                toast.success(` ${action.payload.Nom}`, {
                    position: "bottom-left"
                }) 
            }
        
            localStorage.setItem("cartIteme", JSON.stringify(state.cartIteme))
        },
        supprimerAchat(state,action){
            const removecart = state.cartIteme.filter(item => item._id !== action.payload._id)
            state.cartIteme = removecart;
            localStorage.setItem("cartIteme", JSON.stringify(state.cartIteme))
            toast.warning(` ${action.payload.Nom} supprimer `, {
                position: "bottom-left"
            }) 
         },
        quantiteAction(state,action){
            const finde = state.cartIteme.findIndex(item => item._id === action.payload._id)

            if (state.cartIteme[finde].quantiteProduit > 1) {
                state.cartIteme[finde].quantiteProduit -= 1
            } else if (state.cartIteme[finde].quantiteProduit === 1) {
                const removecart = state.cartIteme.filter(item => item._id !== action.payload._id)
                state.cartIteme = removecart;
            }
            localStorage.setItem("cartIteme", JSON.stringify(state.cartIteme))
        },
        supprimerTous(state,action){
            state.cartIteme = []
            localStorage.setItem("cartIteme", JSON.stringify(state.cartIteme))
            toast.warn("vider", {
                position: "bottom-left"
            }) 
        },
        CalculPrixQuantite(state,action){
            let{total, quantite} = state.cartIteme.reduce(
                (cartTotal, cartIteme)=>{
                   const { Prix, quantiteProduit } = cartIteme;
                   const itemTotal = Prix * quantiteProduit

                   cartTotal.total += itemTotal
                   cartTotal.quantite += quantiteProduit

                   return cartTotal;
                }
                ,
             {
                total: 0,
                quantite: 0
             }
            );

            state.Quantite = quantite;
            state.PrixTotale = total;

        }
    }
})

export const { Addcart , supprimerAchat, quantiteAction,supprimerTous, CalculPrixQuantite} = cartSlice.actions;
export default cartSlice.reducer;