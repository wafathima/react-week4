import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5001/users";

let persistedUser = null;
try {
  const stored = localStorage.getItem("user");
  persistedUser = stored ? JSON.parse(stored) : null;
} catch (e) {
  localStorage.removeItem("user");
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5001/users");
      const users = await res.json();

      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

     
      if (user.status === "block") {
        return rejectWithValue("Your account has been blocked by the admin.");
      }

      return user;
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const check = await axios.get(`${API}?email=${email}`);
      if (check.data.length > 0) {
        return thunkAPI.rejectWithValue("User already exists.");
      }

      const newUser = { name, email, password, role: "user", isBlocked: false };
      const res = await axios.post(API, newUser);
      const { password: _, ...safeUser } = res.data;
      return safeUser;
    } catch (err) {
      return thunkAPI.rejectWithValue("Signup failed.");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async(UserId,thunkAPI)=>{
    try{
      await axios.delete(`${API}/${userId}`);
      return userId;
    }catch(err){
      return thunkAPI.rejectWithValue("failed to delete user.")
    }
  }
)

export const toggleBlockUser = createAsyncThunk(
  "auth/toggleBlockUser",
  async({userId,isBlocked},thunkAPI)=>{
    try{
      const res = await axios.patch(`${API}/${userId}`,{isBlocked});
      return res.data;
    }catch(err){
      return thunkAPI.rejectWithValue("failed to update block status")
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: persistedUser,
    status: "idle",
    error: null,
    users:[],
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUsers:(state,action)=>{
      state.users= action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(deleteUser.fulfilled,(state,action)=>{
        state.users=state.users.filter((u)=> u.id !== action.payload)
      })
      .addCase(toggleBlockUser.fulfilled,(state,action)=>{
        state.users = state.users.map((u)=>
        u.id === action.payload.id? action.payload:u
        );
      });
  },
});

export const { logout,setUsers } = authSlice.actions;
export default authSlice.reducer;
