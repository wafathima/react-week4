import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5001/users";

const persisted = JSON.parse(localStorage.getItem("user")|| "null");

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password})=> {
        const res = await axios.post(API, {name, email, password });
        return res.data;
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        const res = await axios.get(`${API}?email=${email}&password=${password}`);
        if (res.data.length === 0){
            return thunkAPI.rejectWithValue("Invalid email or password");
        }
        return res.data[0];
    }
);

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:persisted,
        status:"idle",
        error:null,
        },
        reducers:{
            logout(state){
                state.user= null;
                localStorage.removeItem("user");
            },
        },
        extraReducers:(builder)=>{
            builder
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.user = action.payload;
                state.status = "succeeded";
                localStorage.setItem("user",JSON.stringify(action.payload));
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.user = action.payload;
                state.status= "succeeded";
                localStorage.setItem("user",JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.error = action.payload;
                state.status= "failed";
            });
        },
});

export const {logout} = authSlice.actions; 
export default authSlice.reducer;

