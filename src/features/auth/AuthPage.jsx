import { useState } from "react";
import { useDispatch } from "react-redux";
import {loginUser} from "./authSlice"
import { useNavigate,useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {LogIn} from "lucide-react";
import Navbar from "../../components/Navbar";

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
             toast.success(
            <div className="felx flex-col items-start">
            <span className="font-bold text-white">Login Succesfull!</span>
            </div>,
            {
                duration:3000,
                style:{
                    background:'#305585ff',
                    padding:'16px',
                    borderRadius:'12px'
                },
            }
        );
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
         <div>
            <Navbar/>
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-300">
            <div className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96 border border-gray-200" >

            {/* {header} */}
            <div className="flex flex-col items-center mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <LogIn className="text-blue-700 w-6 h-6"/>
                    <h2 className="text-3xl font-bold text-blue-700">WELCOME!</h2>
                </div>
                <p className="text-gray-500 text-sm">Login to continue your journey</p>
            </div>

            {/* {form} */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />

                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button 
                className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold tracking-wide transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
                >
                Login
                </button>
            </form>

             {/* {message} */}
             {msg &&(
                <p className="text-red-500 text-center mt-3 font-medium">{msg}</p>
             )}

             {/* {footer} */}
             <div className="text-center mt-6 text-gray-600 text-sm">
                <span>Don't have an account?</span>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Register</a>

             </div>
            </div>
        </div>
        </div>
    );
}


