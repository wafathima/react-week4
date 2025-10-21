import { useState } from "react";
import { useDispatch } from "react-redux";
import {loginUser,registerUser} from "./authSlice"
import { useNavigate,useLocation } from "react-router-dom";

export default function AuthPage(){
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email,setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [msg ,setMsg] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/"

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!email || !password || (!isLogin && !name)){
            setMsg("Please fill all required fields")
            return;
        }
        try{
            if(isLogin){
                const resultAction = await dispatch(loginUser({email,password}));
                if (loginUser.fulfilled.match(resultAction)){
                    navigate(from,{replace:true});
                }else{
                    setMsg(resultAction.payload || "Login failed")
                }
            }else{
                const resultAction = await dispatch(registerUser({name,email,password}));
                if (registerUser.fulfilled.match(resultAction)){
                    navigate(from ,{replace:true})
                }else {
                    setMsg("Register failed")
                }
            }
        }catch(err){
            setMsg("Something went wrong")
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? "Login":"Register"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {!isLogin &&(
                <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="border p-2 rounded"/>
            )}
            <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 rounded"/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border p-2 rounded"/>
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">{isLogin? "Login":"Register"}</button>
        </form>

        <p className="text-center mt-3 text-sm">
            {isLogin? "No account?" : "Have account?"}{" "}
            <span className="text-blue-600 cursor-pointer" onClick={()=>setIsLogin(!isLogin)}>{isLogin ? "Register":"Login"}</span>
        </p>
       <p className="text-red-500 text-center mt-2">{msg}</p>
        </div>  
        </div>
    );
}


