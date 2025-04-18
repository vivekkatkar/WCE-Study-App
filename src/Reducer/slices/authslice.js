

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ?  JSON.parse(localStorage.getItem("token")) : null ,
    signUpData:null,
    loading:false,
     
    
}


const authSlice = createSlice(
    {
        name:"auth",
        initialState:initialState,
        reducers:{
             setToken(state,value){
               state.token = value.payload
             },
             setLoading(state,value){
                state.loading = value.payload
             },
             setSignUp(state,value){
                state.signUpData = value.payload
             }
             
        },
    },
)

export const {setToken,setLoading,setSignUp} = authSlice.actions;
 
export default  authSlice.reducer;


