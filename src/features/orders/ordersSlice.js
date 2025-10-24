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
            // newOrder.items= [];
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



// import { createSlice } from "@reduxjs/toolkit";

// const persistedOrders = JSON.parse(localStorage.getItem("order")|| "[]");

// const ordersSlice = createSlice({
//     name:"orders",
//     initialState:{items:persistedOrders},
//     reducers:{
//         addOrder(state, action){
//             const existing = state.items.find (i=> i.id === action.payload.id);
//             if (existing){
//                 existing.qty += 1;
//             }else{
//                 state.items.push({...action.payload,qty:1});
//             }
//             localStorage.setItem("order", JSON.stringify(state.items));
//         },
//         removeFromOrder(state,action){
//             state.items = state.items.filter(i=> i.id !== action.payload);
//             localStorage.setItem("order",JSON.stringify(state.items));
//         },
//         clearOrder(state){
//             state.items =[];
//             localStorage.removeItem("order");
//         },
//         setQty(state,action){
//             const { id,qty } = action.payload;
//             const item = state.items.find(i=> i.id === id);
//             if(item)item.qty = qty;
//             localStorage.setItem("order",JSON.stringify(state.items));
//         },
//     },
// });
// export const {addOrder , removeFromOrder , clearOrder , setQty} = ordersSlice.actions;
// export default ordersSlice.reducer;

