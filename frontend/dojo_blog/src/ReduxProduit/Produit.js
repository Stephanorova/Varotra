import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"



const initialState = {
     items: [],
     status: null
}


export const ProduitAPI = createAsyncThunk(
    'produit/ProduitAPI',
      async()=>{
        const reponse = await axios.get('http://localhost:5000/api/produit')
        return reponse.data
      }
)





const ProduitSlice = createSlice({
      name:"produits",
      initialState,
      reducers: {},
      extraReducers: {
        [ProduitAPI.pending]: (state,action) =>{
            state.status = "pending"
        },
        [ProduitAPI.fulfilled]: (state,action) =>{
            state.status = "success"
            state.items = action.payload
        },
        [ProduitAPI.rejected]: (state,action) =>{
            state.status = "rejected"
        },
      }
})


export default ProduitSlice.reducer;