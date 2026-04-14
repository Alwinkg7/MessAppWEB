import Cookies from "js-cookie";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7137";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = Cookies.get("token");

  const headers = new Headers(options.headers || {});

  // Only set Content-Type to JSON if we're not sending FormData
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", headers.get("Content-Type") || "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 🔥 HANDLE TOKEN EXPIRY FIRST
    if (response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        // Optional: lazy import to avoid SSR issues
        import("react-hot-toast").then(({ default: toast }) => {
          toast.error("Session expired. Please login again.");
        });

        window.location.href = "/login";
      }

      throw new ApiError("Unauthorized", 401);
    }

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText };
      }

      const errorMessage =
        errorData.error || errorData.message || errorData.title || "An error occurred";

      throw new ApiError(errorMessage, response.status, errorData);
    }

    // if response is no content, just return empty
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network errors etc.
    throw new ApiError(error instanceof Error ? error.message : "Network error", 500);
  }
};
