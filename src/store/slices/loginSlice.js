import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'auth',
    initialState:{
        token: "",
        name:"",
    },

    reducers:{
        setToken: (state,action) =>{
            state.token = action.payload.token;
            state.name = action.payload.name;
            console.log("Here");
        },
        removeToken: (state) =>{
            state.token = undefined;
            state.name=undefined;
        }
    },
});
export const {setToken,removeToken} = loginSlice.actions
export default loginSlice.reducer;