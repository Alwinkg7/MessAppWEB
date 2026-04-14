import { apiFetch } from "./api";

export const getAllUsers = async () => {
  return await apiFetch("/api/Users", {
    method: "GET",
  });
};

export const getUserById = async (id: number) => {
  return await apiFetch(`/api/Users/${id}`, {
    method: "GET",
  });
};

// Stub for status toggle, assuming a dedicated endpoint or PUT operation
export const toggleUserStatus = async (id: number, isActive: boolean) => {
  // Using a hypotethical endpoint, switch to the correct one if needed
  return await apiFetch(`/api/Users/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ isActive }),
  });
};
