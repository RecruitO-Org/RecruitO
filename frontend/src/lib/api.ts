import { useAuthStore, isTokenExpired } from "../store/AuthStore";

export const BASE_URL = "http://127.0.0.1:8000";

/**
 * Centralized HTTP client for the RecruitO backend.
 * Attaches the JWT from the auth store, JSON-encodes bodies, and normalizes
 * errors so callers can catch a single Error with a readable message.
 */
async function request<T>(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
    formData?: FormData;
  } = {}
): Promise<T> {
  const { token, logout } = useAuthStore.getState();

  // Expired token: clear it and force a re-login before hitting the server.
  if (isTokenExpired(token)) {
    logout();
    throw new Error("Your session has expired. Please sign in again.");
  }

  const headers: Record<string, string> = {
    ...options.headers,
  };

  let body: BodyInit | undefined;
  if (options.formData) {
    body = options.formData;
  } else if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || (options.body !== undefined || options.formData ? "POST" : "GET"),
    headers,
    body,
  });

  if (res.status === 204) {
    return undefined as T;
  }

  // Token rejected by the server -> session is invalid.
  if (res.status === 401) {
    logout();
    throw new Error("Your session has expired. Please sign in again.");
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const detail = data?.detail;
    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
        ? detail.map((d: { msg?: string }) => d.msg).filter(Boolean).join("; ")
        : data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: "PUT", body }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: <T>(path: string, formData: FormData) =>
    request<T>(path, { method: "POST", formData }),
};
