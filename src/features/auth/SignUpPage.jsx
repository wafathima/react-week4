import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function SignUpPage(){
    const [name,setName]=useState("")
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [msg,setMsg] = useState("")

    const navigate = useNavigate();
    const API = "http://localhost:5001/users";

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!name ||  !email || !password){
            setMsg("Please fill all required fields");
            return;
        }

        try{
            const res = await axios.get(`http://localhost:5001/users?email=${email}`)

            if(res.data.length >0){
                toast.error("User already exists! Please login instead.");
                navigate("/auth");
                return;
            }
            const newUser ={name , email , password};
            await axios.post ("http://localhost:5001/users", newUser);

            const safeUser ={name,email};
            localStorage.setItem("user",JSON.stringify(safeUser));

            toast.success("Account created successfully!");
            navigate("/auth");
        }catch(err){
            console.error(err);
            setMsg("Somthing went wrong. Try again!")
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96 border border-gray-200">

                {/* {header} */}
                <div className="flex flex-col items-center mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <UserPlus className="text-gray-700 w-6 h-6"/>
                        <h2 className="text-3xl font-bold text-gray-700">CREATE ACCOUNT</h2>
                    </div>
                    <p className="text-gray-500 text-sm">Sign up to start your journey</p>
                </div>

                {/* {form} */}
                 <form onSubmit={handleSubmit} 
                 className="flex flex-col gap-4">
                    <input
                    placeholder="Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    />
                
                    <input 
                     placeholder="Email"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    />

                    <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    />

                    <button
                    type="submit"
                    className="bg-black hover:bg-gray-700 text-white py-3 rounded-lg font-semibold tracking-wide transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                     Sign Up
                    </button>
                 </form>

                 {/* {msg} */}
                 {msg && (
                    <p className="text-red-500 text-center mt-3 font-medium">{msg}</p>
                 )}

                 {/* {footer} */}

                 <div className="text-center mt-6 text-gray-600 text-sm">
                    <span>Already have an account?</span>
                    <a href="/auth"
                    className="text-blue-600 font-semibold hover:underline"
                    >
                    Login
                    </a>
                 </div>
                </div>
            </div>
        </div>
    )
}