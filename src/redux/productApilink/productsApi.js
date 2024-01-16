import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"



export const productsApi=createApi({
    reducerPath:"productsApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8888"}),
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:()=>"products",
        })
    })
})
export const { useGetAllProductsQuery } = productsApi;
export default productsApi.reducer
