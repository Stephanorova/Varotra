import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import ProduitReducer, { ProduitAPI } from "./ReduxProduit/Produit"
import { produitApi } from "./ReduxProduit/API";
import cartReducer, { CalculPrixQuantite } from "./ReduxCart/EnregistrerCart"
import AuthReducer, { registerLoader } from "./ReduxAuthanticication/Authantification"


const store = configureStore({
      reducer:{
            auth : AuthReducer,
            produits: ProduitReducer,
            cart: cartReducer,
            [produitApi.reducerPath]:produitApi.reducer
       },
       middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(produitApi.middleware),
       
})

store.dispatch(ProduitAPI())
store.dispatch(CalculPrixQuantite())
store.dispatch(registerLoader(null)) 


ReactDOM.render(
      <Provider store={store}>
         <App/>
      </Provider>
,document.querySelector("#root"));