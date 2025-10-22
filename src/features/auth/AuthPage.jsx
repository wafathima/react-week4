import { useState } from "react";
import { useDispatch } from "react-redux";
import {loginUser} from "./authSlice"
import { useNavigate,useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function AuthPage(){
    const [email,setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [msg ,setMsg] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/"

    const handleSubmit = async (e) =>{
        e.preventDefault();
    

    if(!email || !password){
        setMsg("Please fill all required fields")
        return;
    }
    try{
        const resultAction = await dispatch(loginUser({email,password}));
        

        if(loginUser.fulfilled.match(resultAction)){
            const user = resultAction.payload;
            toast.success(`Login Succesfull!`);
            navigate(from,{replace:true});

        }else{
            setMsg(resultAction.payload || "Login failed")
        }

    }catch(err){
    console.log(err);
    setMsg("Somthing went wrong")
    }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-amber-200 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4 text-amber-600">LOGIN</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        
            <input 
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            className="border p-2 rounded"
            />
            <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} 
            className="border p-2 rounded"
            />
            <button className="bg-amber-800 text-white p-2 rounded hover:bg-amber-600">Login</button>
            </form>
            
            {msg && <p className="text-red-500 text-center mt-2">{msg}</p>}
        
        </div>  
        </div>
    );
}


