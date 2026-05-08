"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-100 dark:border-gray-800 transition">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-300 via-orange-400 to-blue-500 flex items-center justify-center text-white text-2xl shadow-lg">
            ☀️
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Mintara
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Learn Without Limits
            </p>
          </div>

        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">

          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition font-medium">
            الرئيسية
          </Link>

          <Link href="/teachers" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition font-medium">
            المدرسون
          </Link>

          <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition font-medium">
            Dashboard
          </Link>

          <Link href="/notifications" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition font-medium">
            🔔 الإشعارات
          </Link>

          <Link href="/chat" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition font-medium">
            💬 Chat
          </Link>

        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">

          {/* 🌙 Dark Mode Button */}
          <DarkModeToggle />

          <Link
            href="/login"
            className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 transition font-medium"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl font-medium shadow-lg"
          >
            Sign Up
          </Link>

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-900 dark:text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 space-y-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">

          <Link href="/" className="block text-gray-700 dark:text-gray-300 font-medium">
            الرئيسية
          </Link>

          <Link href="/teachers" className="block text-gray-700 dark:text-gray-300 font-medium">
            المدرسون
          </Link>

          <Link href="/dashboard" className="block text-gray-700 dark:text-gray-300 font-medium">
            Dashboard
          </Link>

          <Link href="/notifications" className="block text-gray-700 dark:text-gray-300 font-medium">
            🔔 الإشعارات
          </Link>

          <Link href="/chat" className="block text-gray-700 dark:text-gray-300 font-medium">
            💬 Chat
          </Link>

          <div className="flex gap-3 pt-3">

            <Link
              href="/login"
              className="flex-1 text-center px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Sign Up
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
}