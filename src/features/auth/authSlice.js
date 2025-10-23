import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API = "http://localhost:5001/users";

let persisted = null;
try{
    const user = localStorage.getItem("user");
    persisted = user? JSON.parse(user):null;
}catch(err){
    persisted=null;
    localStorage.removeItem("user");
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({email,password},thunkAPI)=>{
        try{
            const res=await axios.get(`${API}?email=${email}&password=${password}`);

            if (res.data.length === 0){
                const newUser = {email,password,name:email.split("@")[0]};
                const createRes = await axios.post(API,newUser);
                const {password:_, ...safeUser} = createRes.data;
                return safeUser;
            }
            const {password:_,...safeUser}=res.data[0];
            return safeUser;
            }catch(err) {
            return thunkAPI.rejectWithValue("server error")
        }
    }
);

const authSlice= createSlice({
    name:"auth",
    initialState:{
        user:persisted,
        status:"idle",
        error:null, 
    },
    reducers:{
      logout(state){
        state.user=null;
        localStorage.removeItem("user");
      },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.user = action.payload;
            state.status = "succeeded";
            localStorage.setItem("user",JSON.stringify(action.payload));
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.error = action.payload;
            state.status = "failed";
        });
    },
});
export const {logout} = authSlice.actions;
export default authSlice.reducer