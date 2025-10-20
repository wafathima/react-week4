import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";

export default configureStore({
    reducer :{
        auth : authReducer,
        products : productsReducer,
        cart : cartReducer,
    },
});

