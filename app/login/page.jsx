"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiUrl } from "../../lib/api";
import { saveAuthSession } from "../../lib/authClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Login failed");
      }

      saveAuthSession({
        token: json.data.token,
        user: json.data.user,
      });

      toast.success("Logged in successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Login</h1>
        <p className="text-secondary-600 mb-6">Welcome back. Continue to your account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input-field"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn-primary w-full justify-center" disabled={isSubmitting}>
            {isSubmitting ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-secondary-600 mt-4">
          New user?{" "}
          <Link href="/signup" className="text-primary-600 font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
