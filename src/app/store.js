import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import ordersReducer from "../features/orders/ordersSlice";
import bagReducer from "../features/bag/bagSlice";


export default configureStore({
    reducer :{
        auth : authReducer,
        products : productsReducer,
        cart : cartReducer,
        orders : ordersReducer,
        bag : bagReducer,
       
    },
});


