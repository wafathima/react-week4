import {createSlice} from "@reduxjs/toolkit";

import toast from "react-hot-toast";

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:{
        items:[],
    },
    reducers:{
        addToWishlist:(state,action)=>{
            const item = action.payload;
            const exists = state.items.find((i)=> i.id === item.id);
            toast.success("Added to wishlist!")
            if(!exists){
                state.items.push(item);
               
            }
        },
        removeFromWishlist:(state,action)=>{
            state.items=state.items.filter((item)=> item.id !== action.payload);
            toast.success("Removed from Wishlist")
        },
        clearWishlist:(state)=>{
            state.items =[];
        },
    },
});
export const {addToWishlist,removeFromWishlist,clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;