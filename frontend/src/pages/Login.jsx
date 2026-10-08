import { useState } from "react";
import { api } from "../api/client";
import { useDispatch } from "react-redux";
import { setAuth } from "../app/store";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState("");
  const d = useDispatch(),
    nav = useNavigate();
  async function submit(e) {
    e.preventDefault();
    try {
      const r = await api.post("/auth/login", { email, password });
      d(setAuth(r.data));
      nav("/");
    } catch (e) {
      setError(e.response?.data?.error || "Login failed");
    }
  }
  return (
    <main>
      <h1>CampusConnect</h1>
      <form onSubmit={submit}>
        <input
          aria-label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          aria-label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button>Login</button>
        {error && <p role="alert">{error}</p>}
      </form>
    </main>
  );
}
