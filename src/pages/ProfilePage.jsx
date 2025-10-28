import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProfilePage(){
    const user = useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isEditing,setIsEditing]= useState(false);
    const [formData,setFormData]=useState({
        name:user?.name||"",
        email:user?.email||"",
    });

    if(!user) 
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                Please login to view your info
               </h2>
               <p className="text-gray-500">You need to log in to see your profile.</p> 
            </div>
        </div>
    );

    const handleEditToggle =()=>{
        setIsEditing(!isEditing);
    };

    const handleSave = ()=>{
        localStorage.setItem(
            "user",
            JSON.stringify({...user,name:formData.name,email:formData.email})
        );
        setIsEditing(false)
    };

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleLogout = ()=>{
        dispatch(logout());
        navigate("/");
    };

    return (
        <div>
            <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center border border-gray-200">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold mb-5">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                      
                      {isEditing?(
                        <>
                        <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-3/4 mb-3 text-center "
                        />
                        <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-3/4 mb-3 text-center"
                        />
                        <button 
                        onClick={handleSave}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all"
                        >
                         Save
                        </button>
                        </>
                      ):(
                        <>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-2">{formData.name}</h2>
                        <p className="text-gray-500 mb-6">{formData.email}</p>
                        <button
                        onClick={handleEditToggle}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
                        >
                        Edit
                        </button>
                        </>
                      )}
                      <button
                      onClick={handleLogout}
                      className="mt-5 text-red-600 hover:text-red-800 font-semibold "
                      >
                       Logout
                      </button>
                </div>
            </div>
        </div>
        </div>
    );
}