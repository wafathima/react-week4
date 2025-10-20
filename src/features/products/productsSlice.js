import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5001/products";

export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async () => {
        const res = await axios.get(API);
        return res.data;
    }
);

const productslice = createSlice({
    name:"products",
    initialState:{
        items:[],
        status:"idle",
        error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>
             {state.status= "loading";})

        .addCase(fetchProducts.fulfilled,(state,action)=>{state.status = "succeeded";
            state.items=action.payload})

        .addCase(fetchProducts.rejected,(state,action)=> {state.status = "failed"; 
            state.error = action.error.message;});
    },
});
export default productslice.reducer;

