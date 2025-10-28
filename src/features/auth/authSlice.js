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

// export const loginUser = createAsyncThunk(
//     "auth/loginUser",
//     async ({email,password},thunkAPI)=>{
//         try{
//             const res=await axios.get(`${API}?email=${email}&password=${password}`);

//             if (res.data.length === 0){
//                 const newUser = {email,password,name:email.split("@")[0]};
//                 const createRes = await axios.post(API,newUser);
//                 const {password:_, ...safeUser} = createRes.data;
//                 return safeUser;
//             }
//             const {password:_,...safeUser}=res.data[0];
//             return safeUser;
//             }catch(err) {
//             return thunkAPI.rejectWithValue("server error")
//         }
//     }
// );

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({email,password},thunkAPI) =>{
        try{
            const res = await axios.get(`${API}?email=${email}`)
            if (res.data.length === 0){
                return thunkAPI.rejectWithValue("user not found. please sign up.")
            }
            const user = res.data[0];
            if(user.password !== password){
                return thunkAPI.rejectWithValue("invalid password");
            }
            const {password: _,...safeUser} = user;
            return safeUser;
        }catch(err){
            return thunkAPI.rejectWithValue("server error")
        }
    }
);

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({email,password,name},thunkAPI)=>{
        try{
            const check = await axios.get(`${API}?email=${email}`);
            if (check.data.length > 0){
                return thunkAPI.rejectWithValue("user already exists")
            }
            const newUser = {email , password , name};
            const res = await axios.post(API, newUser);

            const {password:_, ...safeUser}=res.data;
            return safeUser;
        }catch(err){
            return thunkAPI.rejectWithValue("signup failed")
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
      logout:(state)=>{
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
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.user = action.payload;
            state.status = "succeeded";
            localStorage.setItem("user",JSON.stringify(action,payload))
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.error = action.payload;
            state.status ="failed";
        });
    },
});
export const {logout} = authSlice.actions;
export default authSlice.reducer