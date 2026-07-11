"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AppPageLayout from "@/components/layout/AppPageLayout";
import { supabase } from "@/lib/supabase";
import {
  FaUser,
  FaLock,
  FaSignOutAlt,
  FaSave,
  FaShieldAlt,
} from "react-icons/fa";

const inputClassName =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white backdrop-blur-sm outline-none transition-colors placeholder:text-gray-500 focus:border-violet-500/50 focus:bg-white/[0.05]";

const labelClassName = "mb-2 block text-sm font-medium text-gray-300";

function SettingsCard({
  title,
  description,
  icon: Icon,
  iconGradient,
  children,
  delay,
  reducedMotion,
  variant = "default",
}: {
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconGradient: string;
  children: React.ReactNode;
  delay: number;
  reducedMotion: boolean;
  variant?: "default" | "danger";
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border p-6 backdrop-blur-xl sm:p-8 ${
        variant === "danger"
          ? "border-red-500/20 bg-red-500/[0.04]"
          : "border-white/[0.06] bg-white/[0.03]"
      }`}
    >
      <div className="mb-6 flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${iconGradient}`}
        >
          <Icon className="text-lg text-white" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setEmail(user.email || "");
      setDisplayName(
        user.user_metadata?.display_name || user.user_metadata?.full_name || ""
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
    <AppPageLayout
      title={
        <>
          Account{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Settings
          </span>
        </>
      }
      subtitle="Update your profile, security, and account preferences."
    >
      {message && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400 backdrop-blur-sm"
        >
          {message}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 backdrop-blur-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="w-full max-w-3xl space-y-6">
        <SettingsCard
          title="Profile"
          description="Manage your public display information"
          icon={FaUser}
          iconGradient="from-violet-500 to-purple-600"
          delay={0.05}
          reducedMotion={reducedMotion}
        >
          <div className="space-y-5">
            <div>
              <label className={labelClassName}>Display Name</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
                className={inputClassName}
              />
              <p className="mt-2 text-xs text-gray-500">
                This name will appear across your dashboard.
              </p>
            </div>

            <div>
              <label className={labelClassName}>Email Address</label>
              <input
                value={email}
                disabled
                className={`${inputClassName} cursor-not-allowed opacity-60`}
              />
              <p className="mt-2 text-xs text-gray-500">
                Your email cannot be changed here.
              </p>
            </div>

            <motion.button
              type="button"
              onClick={saveProfile}
              disabled={loadingProfile}
              whileHover={reducedMotion ? undefined : { scale: 1.01 }}
              whileTap={reducedMotion ? undefined : { scale: 0.99 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-all hover:brightness-110 disabled:opacity-50"
            >
              <FaSave aria-hidden="true" />
              {loadingProfile ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Security"
          description="Keep your account safe with a strong password"
          icon={FaShieldAlt}
          iconGradient="from-indigo-500 to-violet-600"
          delay={0.1}
          reducedMotion={reducedMotion}
        >
          <div className="space-y-5">
            <div>
              <label className={labelClassName}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter a new password"
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className={inputClassName}
              />
            </div>

            <motion.button
              type="button"
              onClick={updatePassword}
              disabled={loadingPassword}
              whileHover={reducedMotion ? undefined : { scale: 1.01 }}
              whileTap={reducedMotion ? undefined : { scale: 0.99 }}
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-6 py-3 text-sm font-semibold text-violet-200 transition-all hover:border-violet-500/50 hover:bg-violet-500/20 disabled:opacity-50"
            >
              <FaLock aria-hidden="true" />
              {loadingPassword ? "Updating..." : "Update Password"}
            </motion.button>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Account"
          description="Sign out of UnlockScripts on this device"
          icon={FaSignOutAlt}
          iconGradient="from-red-500 to-rose-600"
          delay={0.15}
          reducedMotion={reducedMotion}
          variant="danger"
        >
          <motion.button
            type="button"
            onClick={logout}
            whileHover={reducedMotion ? undefined : { scale: 1.01 }}
            whileTap={reducedMotion ? undefined : { scale: 0.99 }}
            className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/20 transition-all hover:bg-red-500"
          >
            Logout
          </motion.button>
        </SettingsCard>
      </div>
    </AppPageLayout>
  );
}
