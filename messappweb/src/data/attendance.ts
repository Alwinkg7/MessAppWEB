import { apiFetch } from "./api";

// POST {{devURL}}api/Attendance/scan
export const scanAttendance = async (qrCodeValue: string) => {
  return await apiFetch("/api/Attendance/scan", {
    method: "POST",
    body: JSON.stringify({ qrCodeValue }),
  });
};

// Stub for mock get attendances for admin
export const getAttendances = async () => {
  return await apiFetch("/api/Attendance", {
    method: "GET",
  });
};

// GET {{devURL}}api/Attendance/user/{userId}
export const getUserAttendance = async (userId: string | number) => {
  return await apiFetch(`/api/Attendance/user/${userId}`, {
    method: "GET",
  });
};
