import { createSlice } from "@reduxjs/toolkit";

const persistedOrders = JSON.parse(localStorage.getItem("orders")|| "[]");

const ordersSlice = createSlice({
    name:"orders",
    initialState:{items : persistedOrders},
    reducers:{

        addOrder:(state,action)=>{
          const newOrder = action.payload;

         if(!newOrder.items || !Array.isArray(newOrder.items)){
            newOrder.items = [];
         }

            state.items.push(newOrder);
            localStorage.setItem("orders",JSON.stringify(state.items));
            
        },

        clearOrders:(state)=>{
            state.items =[];
            localStorage.removeItem("orders");
        },
        removeFromOrder(state,action){
            state.items = state.items.filter(i=> i.id !== action.payload);
            localStorage.setItem("orders",JSON.stringify(state.items));
        },
           
    },
});

export const {addOrder , clearOrders,removeFromOrder} = ordersSlice.actions;
export default ordersSlice.reducer;




