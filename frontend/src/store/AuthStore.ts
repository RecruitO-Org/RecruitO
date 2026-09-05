import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  role: "admin" | "company" | "user" | null;
  name: string | null;
  email: string | null;
  login: (
    token: string,
    role: "admin" | "company" | "user",
    name: string,
    email: string
  ) => void;
  logout: () => void;
}

/** Decode a JWT's payload (the middle segment) without a library. */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(
      json
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    ));
  } catch {
    return null;
  }
}

/** True when the JWT exists and its `exp` claim (seconds) has passed. */
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;
  if (typeof exp !== "number") return false; // no exp -> treat as valid
  return Date.now() >= exp * 1000;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      name: null,
      email: null,
      login: (token, role, name, email) =>
        set({
          token,
          role,
          name,
          email,
        }),
      logout: () =>
        set({
          token: null,
          role: null,
          name: null,
          email: null,
        }),
    }),
    {
      name: "recruito-auth",
    }
  )
);
