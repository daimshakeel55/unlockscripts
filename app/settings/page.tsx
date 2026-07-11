"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";
import {
  FaCog,
  FaUser,
  FaLock,
  FaSignOutAlt,
  FaSave,
} from "react-icons/fa";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setEmail(user.email || "");

      setDisplayName(
        user.user_metadata?.display_name ||
          user.user_metadata?.full_name ||
          ""
      );
    }

    loadUser();
  }, []);

  async function saveProfile() {
    setLoadingProfile(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.updateUser({
      data: {
        display_name: displayName,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Profile updated successfully.");
    }

    setLoadingProfile(false);
  }

  async function updatePassword() {
    setMessage("");
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoadingPassword(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    }

    setLoadingPassword(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <main className="flex min-h-screen bg-[#0B0B0F] text-white">
      <Sidebar />

      <section className="flex-1 overflow-y-auto p-10">
        <div className="mb-10 flex items-center gap-4">
          <div className="rounded-2xl bg-violet-600 p-4">
            <FaCog className="text-2xl text-white" />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Settings
            </h1>

            <p className="mt-2 text-gray-400">
              Update your profile and security settings.
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
            ✅ {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            ❌ {error}
          </div>
        )}

        <div className="space-y-8">
          <div className="rounded-2xl border border-gray-800 bg-[#18181F] p-8">
            <div className="mb-6 flex items-center gap-3">
              <FaUser className="text-violet-500" />

              <h2 className="text-2xl font-bold">
                Profile
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Display Name
                </label>

                <input
                  value={displayName}
                  onChange={(e) =>
                    setDisplayName(e.target.value)
                  }
                  placeholder="Enter your display name"
                  className="w-full rounded-xl border border-gray-700 bg-[#0F0F14] p-4 outline-none transition focus:border-violet-500"
                />

                <p className="mt-2 text-xs text-gray-500">
                  This name will appear across your dashboard.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Email Address
                </label>

                <input
                  value={email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-gray-700 bg-[#111118] p-4 text-gray-500"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Your email cannot be changed here.
                </p>
              </div>

              <button
                onClick={saveProfile}
                disabled={loadingProfile}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500 disabled:opacity-50"
              >
                <FaSave />

                {loadingProfile
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </div>          <div className="rounded-2xl border border-gray-800 bg-[#18181F] p-8">
            <div className="mb-6 flex items-center gap-3">
              <FaLock className="text-violet-500" />

              <h2 className="text-2xl font-bold">
                Security
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="Enter a new password"
                  className="w-full rounded-xl border border-gray-700 bg-[#0F0F14] p-4 outline-none transition focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm your new password"
                  className="w-full rounded-xl border border-gray-700 bg-[#0F0F14] p-4 outline-none transition focus:border-violet-500"
                />
              </div>

              <button
                onClick={updatePassword}
                disabled={loadingPassword}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
              >
                <FaLock />

                {loadingPassword
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-[#18181F] p-8">
            <div className="mb-6 flex items-center gap-3">
              <FaSignOutAlt className="text-red-400" />

              <h2 className="text-2xl font-bold">
                Account
              </h2>
            </div>

            <p className="mb-6 text-gray-400">
              Sign out of your UnlockScripts account on this device.
            </p>

            <button
              onClick={logout}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}