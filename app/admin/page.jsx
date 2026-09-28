"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
export const dynamic = 'force-dynamic';

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res.error) {
      setError("Email ou mot de passe incorrect");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form onSubmit={handleLogin} className="border p-8 rounded shadow-md w-[350px] bg-white">
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
          <button type="submit" className="bg-black text-white w-full py-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Bienvenue Admin 👋</h1>
      <p className="text-gray-600 mt-2">
        Utilise le menu à gauche pour gérer tes blogs et abonnements.
      </p>
    </div>
  );
};

export default AdminPage;