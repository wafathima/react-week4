import { createSlice } from "@reduxjs/toolkit";

const persisted = JSON.parse(localStorage.getItem("cart")|| "[]");

const cartSlice = createSlice({
    name:"cart",
    initialState:{items:persisted},
    reducers:{
        addToCart(state, action){
            const existing = state.items.find (i=> i.id === action.payload.id);
            if (existing){
                existing.qty += 1;
            }else{
                state.items.push({...action.payload,qty:1});
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart(state,action){
            state.items = state.items.filter(i=> i.id !== action.payload);
            localStorage.setItem("cart",JSON.stringify(state.items));
        },
        clearCart(state){
            state.items =[];
            localStorage.removeItem("cart");
        },
        setQty(state,action){
            const { id,qty } = action.payload;
            const item = state.items.find(i=> i.id === id);
            if(item)item.qty = qty;
            localStorage.setItem("cart",JSON.stringify(state.items));
        },
    },
});
export const {addToCart , removeFromCart , clearCart , setQty} = cartSlice.actions;
export default cartSlice.reducer;

