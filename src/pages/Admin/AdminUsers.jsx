import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Eye, Trash2, Lock, Edit, MoreVertical, Check } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const navigate = useNavigate(); 
  
  useEffect(() => {
    fetch("http://localhost:5001/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  const refreshUsers = () => {
    fetch("http://localhost:5001/users")
      .then((res) => res.json())
      .then(setUsers);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5001/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u)=> u.id !== id));
  };

  const handleBlock = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    const newStatus = user.status === "block" ? "active" : "block";
    const updatedUser = { ...user, status: newStatus };

    try {
      await fetch(`http://localhost:5001/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handlePermission = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await fetch(`http://localhost:5001/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    refreshUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditData({ name: user.name, email: user.email });
  };

  const handleSaveEdit = async (id) => {
    await fetch(`http://localhost:5001/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditingUser(null);
    refreshUsers();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">User Management</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
               
                <td className="p-4 flex items-center gap-3">
                  <img
                  src={user.profilePic ||`https://i.pravatar.cc/40?u=${user.email || user.id}`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                  />

                  {editingUser === user.id ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    <span className="font-medium text-gray-900">{user.name}</span>
                  )}
                </td>

                <td className="p-4 text-gray-700">
                  {editingUser === user.id ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>

                <td className="p-4 capitalize">{user.role}</td>

                <td className="p-4 capitalize flex items-center gap-2">
                  <span
                  className={`w-3 h-3 rounded-full ${
                       user.status === "block"
                       ? "bg-red-500"
                       : user.status === "inactive"
                       ? "bg-yellow-400"
                       : "bg-green-500"
                       }`}>
                      </span>

                  <span
                   className={`${
                     user.status === "block"
                     ? "text-red-600"
                      : user.status === "inactive"
                      ? "text-yellow-600"
                      : "text-green-600"
                     }`}>
                  </span>
                  {user.status}</td>

                <td className="p-4 text-gray-500">{user.joined}</td>

                <td className="p-4 text-right relative">
                  {editingUser === user.id ? (
                    <button
                      onClick={() => handleSaveEdit(user.id)}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      <Check className="inline-block w-4 h-4 mr-1" /> Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setMenuOpen(menuOpen === user.id ? null : user.id)
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {menuOpen === user.id && (
                        <div className="absolute right-4 mt-2 w-44 bg-white border rounded-xl shadow-lg z-10">
                          <button
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            <Eye className="w-4 h-4" /> View Profile
                          </button>
                          
                          <button
                            onClick={() => handleEdit(user)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>

                          <button
                            onClick={() => handleBlock(user.id)}
                            className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left ${
                              user.status === "block" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            <Lock className="w-4 h-4" />
                            {user.status === "block" ? "Unblock User" : "Block User"}
                          </button>

                          <button
                            onClick={() => handlePermission(user.id, user.role)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            <Lock className="w-4 h-4" /> Permissions
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No users found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}