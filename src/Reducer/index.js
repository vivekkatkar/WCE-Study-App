

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './slices/authslice'
import  profileReducer from './slices/profileSlice'

import cartReducer from './slices/cartSlice'
import viewCoursesReducer from './slices/viewCouseSlice'
import courseReducer from './slices/courseslice'
const rootReducer = combineReducers({

    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    viewCourse:viewCoursesReducer,
    course:courseReducer,




})
export default rootReducer;





