import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slices/loginSlice';

const store = configureStore({
        reducer:{
        auth: loginReducer
        },
});

export default store;