import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div>
       
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Please login to view your profile
            </h2>
            <p className="text-gray-500 mb-4">
              You need to log in to see your account details.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const profilePic = user.profilePic || 
   `https://i.pravatar.cc/150?u=${user.email || user.name || user.id}`;


  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center border border-gray-100">
          <div className="flex flex-col items-center">
             <img
             src={profilePic}
             alt={user.name}
             className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200 shadow-md"
             />
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              {user.name}
            </h2>
            <p className="text-gray-600 mb-5">{user.email}</p>

            {user.role === "admin" ? (
              <button
                onClick={() => navigate("/admin")}
                className="w-3/4 bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-semibold mb-3 transition"
              >
                Go to Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate("/orders")}
                className="w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold mb-3 transition"
              >
                View My Orders
              </button>
            )}

            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
