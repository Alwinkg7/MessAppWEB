import { apiFetch } from "./api";

export const getAdminDashboardStats = async () => {
  return await apiFetch("/api/Attendance/dashboard", {
    method: "GET",
  });
};
