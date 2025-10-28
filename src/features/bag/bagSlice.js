import {createSlice} from "@reduxjs/toolkit";
import { removeFromOrder } from "../orders/ordersSlice";

let persistedBag = [];
try{
    persistedBag = JSON.parse(localStorage.getItem("bag"))||[];
}catch{
    persistedBag=[];
}
const bagSlice = createSlice({
    name:"bag",
    initialState:{items:persistedBag},
    reducers:{
        addToBag:(state,action)=>{
            const item =action.payload;
            const existing = state.items.find((i)=>i.id === item.id);

            if(existing){
                existing.qty +=1;
            }else{
                state.items.push({...item,qty:1});
            }
            localStorage.setItem("bag",JSON.stringify(state.items));
        },

        removeFromBag :(state,action)=>{
            state.items = state.items.filter((i)=>i.id !== action.payload);
            localStorage.setItem("bag",JSON.stringify(state.items))
        },
        clearBag:(state)=>{
            state.items=[];
            localStorage.removeItem("bag")
        },
    },
});
export const {addToBag, removeFromBag, clearBag} = bagSlice.actions;
export default bagSlice.reducer;