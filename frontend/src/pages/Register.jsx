import { useState } from "react";
import { api } from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "STUDENT"
      });

      setMessage("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (e) {
      setError(e.response?.data?.error || "Registration failed");
    }
  }

  return (
    <main>
      <h1>Create Account</h1>

      <form onSubmit={submit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">Create Account</button>

        {error && <p role="alert">{error}</p>}
        {message && <p>{message}</p>}
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </main>
  );
}