const localFallbackApiBaseUrl = "http://localhost:5000";
const productionFallbackApiBaseUrl = "https://vastraa-backend-j1e6.onrender.com";

const configuredApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

export const API_BASE_URL =
  configuredApiBaseUrl ||
  (process.env.NODE_ENV === "production"
    ? productionFallbackApiBaseUrl
    : localFallbackApiBaseUrl);

export function apiUrl(path) {
  if (!path) return API_BASE_URL;
  if (path.startsWith("/")) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/${path}`;
}
