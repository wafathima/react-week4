import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, Star, Edit, Save, X, Camera } from "lucide-react";

export default function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profilePic: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const userResponse = await fetch(`http://localhost:5001/users/${userId}`);
        
        if (!userResponse.ok) {
          throw new Error(`User not found: ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        setUser(userData);
        setEditData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.location || "",
          profilePic: userData.profilePic || ""
        });

        const ordersResponse = await fetch(`http://localhost:5001/orders?userId=${userId}`);
        
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          ...editData
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      
      toast.success("Profile updated!")
      
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user profile");
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      profilePic: user?.profilePic || ""
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            {error || "User not found"}
          </p>
          <button 
            onClick={() => navigate('/admin/users')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  const totalSpent = orders.reduce((total, order) => total + (parseFloat(order.total) || 0), 0);
  
  const stats = [
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "blue" },
    { label: "Total Spent", value: `$${totalSpent.toFixed(2)}`, icon: DollarSign, color: "green" },
    { label: "Avg. Rating", value: "4.8", icon: Star, color: "yellow" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/users')}
            className="p-2 rounded-lg hover:bg-white transition-colors border border-gray-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">User Profile</h1>
            <p className="text-gray-600">Detailed information about the user</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            user.status === 'active' ? 'bg-green-100 text-green-800' :
            user.status === 'block' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
          </div>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={editData.profilePic || `https://i.pravatar.cc/150?u=${user.email || user.id}`}
                  alt={editData.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
                />
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            handleInputChange('profilePic', e.target.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
              
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl font-semibold text-gray-900 text-center border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 w-full mb-2"
                />
              ) : (
                <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
              )}
              
              <p className="text-gray-600 capitalize">{user.role}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 py-1"
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Add phone number"
                    className="flex-1 border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 py-1"
                  />
                ) : (
                  <span>{user.phone || "No phone provided"}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Add location"
                    className="flex-1 border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 py-1"
                  />
                ) : (
                  <span>{user.location || "No location provided"}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Joined {user.joined || "Unknown"}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <stat.icon className={`w-5 h-5 ${
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'green' ? 'text-green-600' :
                        'text-yellow-600'
                      }`} />
                      <span className="text-gray-700">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Order History</h3>
              <span className="text-gray-600">{orders.length} orders</span>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${order.total}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ShoppingBag className="w-4 h-4" />
                      <span>{order.items?.length || 0} items</span>
                    </div>
                    
                    {order.items && order.items.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.image || `https://via.placeholder.com/40?text=Product`}
                            alt={item.name}
                            className="w-10 h-10 rounded object-cover border"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No orders found for this user</p>
                <p className="text-sm text-gray-500 mt-2">
                  This user hasn't placed any orders yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



// https://images.footlocker.com/content/dam/final/footlocker/site/backpages/2023/story/230623-fl-adidas-brand-page-stories-asp-samba.jpg
// https://cdn.mos.cms.futurecdn.net/8BeQFkAs2wH9yhb5qc3uv9.gif