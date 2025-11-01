import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/auth" replace />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
