"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 handleSubmit appelé"); // زيد هاذ السطر
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("📬 Réponse signIn:", res); // زيد هاذ السطر

    if (res.error) {
      setError("Email ou mot de passe incorrect");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="border p-8 rounded shadow-md w-[350px] bg-white"
      >
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          required
        />
        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;