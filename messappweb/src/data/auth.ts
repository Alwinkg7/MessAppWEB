import { apiFetch } from "./api";

export const loginUser = async (data: any) => {
  return await apiFetch("/api/Auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const registerUser = async (data: any) => {
  return await apiFetch("/api/Users", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
