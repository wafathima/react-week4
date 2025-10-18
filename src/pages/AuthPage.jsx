import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AuthPage(){
    const [isLogin , setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message,setMessage]= useState("");

    const navigate = useNavigate();

    const handleSubmit=async (e) =>{
    e.preventDefault();

    if(isLogin){
        const res = await axios.get(
            `http://localhost:5001/users?email=${email}&password=${password}`
        );
        if(res.data.length >0){
            localStorage.setItem("user",JSON.stringify(res.data[0]));
            navigate("/home")
        }else{
            setMessage("invalid email or password")
        }
    }else{
        const newUser = {name,email,password};
        await axios.post("http://localhost:5001/users",newUser)
        localStorage.setItem("user",JSON.stringify(newUser));
        navigate("/home")
    }
};
     return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold text-center mb-4">
                   {isLogin ? "Login": "Register"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                 {!isLogin && (
                    <input 
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="border p-2 rounded"
                    />
                 )}
                 <input
                 placeholder="Email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className="border p-2 rounded"
                 />
                 <input 
                 type="password"
                 placeholder="password"
                 value={password}
                 onChange={(e)=> setPassword(e.target.value)}
                 className="border p-2 rounded"
                 />
                 <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    {isLogin? "Login":"Register"}
                 </button>
                </form>
                <p className="text-center mt-3 text-sm">
                    {isLogin ? "No account" : "Have account?"}{""}
                    <sapan 
                    className="text-blue-500 cursor-pointer"
                    onClick={()=>setIsLogin(!isLogin)}
                    >
                     {isLogin ? "Register" : "Login"}
                    </sapan>
                </p>
                <p className="text-red-500 text-center mt-2">{message}</p>
            </div>

        </div>
     );
}
export default AuthPage;