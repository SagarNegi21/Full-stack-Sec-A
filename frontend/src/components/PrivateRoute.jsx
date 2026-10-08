import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute({ role }) {
  const u = useSelector((s) => s.auth.user);
  if (!u) return <Navigate to="/login" replace />;
  if (role && u.role !== role) return <Navigate to="/" replace />;
  return <Outlet />;
}
