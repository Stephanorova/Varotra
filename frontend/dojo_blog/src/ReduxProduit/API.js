import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const produitApi = createApi({
    reducerPath:"produitApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/"
    }),
    endpoints: (bulder)=>({
         getAllProduit: bulder.query({
            query: (_id)=> "produit"
         })
    })
})


export const {useGetAllProduitQuery} = produitApi;