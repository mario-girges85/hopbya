import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAvatar = ({
  user,
  language = "ar",
  mobile = false,
  onActionClick,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  const gender = String(user?.gender || "").toLowerCase();
  const isMale = gender === "male";
  const avatarSymbol = isMale ? "M" : "F";
  const labels = {
    ar: {
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      loggingOut: "جاري تسجيل الخروج...",
      noName: "مستخدم",
    },
    en: {
      settings: "Settings",
      logout: "Logout",
      loggingOut: "Logging out...",
      noName: "User",
    },
  };

  const getApiBaseUrl = () => {
    const baseUrl = import.meta.env.VITE_DEMO_API_URL?.trim();
    if (!baseUrl) {
      return null;
    }
    return baseUrl.replace(/\/+$/, "");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));

    const apiBaseUrl = getApiBaseUrl();
    if (apiBaseUrl) {
      try {
        await fetch(`${apiBaseUrl}/api/user/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch {
        // Ignore network errors so local logout still succeeds.
      }
    }

    setIsMenuOpen(false);
    onActionClick?.();
    onLogout?.();
    setIsLoggingOut(false);
  };

  return (
    <div className={`relative ${mobile ? "w-full" : ""}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-full border border-(--color-border) bg-white/85 px-2 py-1.5 transition hover:bg-white ${
          mobile ? "w-full justify-start" : ""
        }`}
      >
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
            isMale ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
          }`}
          aria-hidden
        >
          {avatarSymbol}
        </span>
        <span className="max-w-[160px] truncate text-sm font-semibold text-(--color-primary-text)">
          {fullName || labels[language].noName}
        </span>
      </button>

      {isMenuOpen && (
        <div
          className={`absolute z-50 mt-2 min-w-[180px] rounded-xl border border-(--color-border)/50 bg-white p-1 shadow-lg ${
            mobile ? "left-0 w-full" : "right-0"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              navigate("/settings");
              setIsMenuOpen(false);
              onActionClick?.();
            }}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-(--color-primary-text) transition hover:bg-(--color-main)"
          >
            {labels[language].settings}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoggingOut ? labels[language].loggingOut : labels[language].logout}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
