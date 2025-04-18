
import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "react-hot-toast";

const initialState = {
   
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    total:localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
   
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state, action) {
            state.totalItems = action.payload;
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        },
        addToCart(state, action) {
            state.totalItems += 1;
            state.cart.push(action.payload);
            state.total += action.payload.price;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("total", JSON.stringify(state.total));
        },
        removeFromCart(state, action) {
            const itemToRemove = action.payload;
            state.cart = state.cart.filter(c => c._id !== itemToRemove._id);
            state.totalItems -= 1;
            state.total -= itemToRemove.price;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("total", JSON.stringify(state.total));
        },
        resetCart(state) {
            state.totalItems = 0;
            state.total = 0;
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify([]));
            localStorage.setItem("totalItems", JSON.stringify(0));
            localStorage.setItem("total", JSON.stringify(0));
        },
    

        
    }
   
})

export const {setTotalItems,addToCart,removeFromCart,resetCart}  = cartSlice.actions;
export  default cartSlice.reducer;







