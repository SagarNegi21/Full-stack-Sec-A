import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { store, setAuth } from "./app/store";
import { setTokenGetter } from "./api/client";
import Login from './pages/Login';
import Register from './pages/Register';
import Events from "./pages/Events";
import PrivateRoute from "./components/PrivateRoute";
import "./style.css";
function App() {
  const u = useSelector((s) => s.auth.user),
    token = useSelector((s) => s.auth.accessToken),
    [count, setCount] = useState(0);
  useEffect(() => {
    setTokenGetter(() => store.getState().auth.accessToken);
  }, []);
  useEffect(() => {
    if (!token || u?.role !== "STUDENT") return;
    const s = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
      auth: { token },
      reconnection: true,
    });
    s.on("new-announcement", () => setCount((c) => c + 1));
    return () => s.disconnect();
  }, [token, u]);
  return (
    <>
      <nav>
        <Link to="/">CampusConnect</Link>
        {u && (
          <span>
            {u.name} ({u.role}) {count > 0 && <b>🔔 {count}</b>}
          </span>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Events />} />
        </Route>
      </Routes>
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
