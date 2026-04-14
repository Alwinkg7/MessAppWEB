import { apiFetch } from "./api";

// POST {{devURL}}api/Billing/generate/2026/4
export const generateBilling = async (year: number, month: number) => {
  return await apiFetch(`/api/Billing/generate/${year}/${month}`, {
    method: "POST",
  });
};

// GET {{devURL}}api/Billing/user/1
export const getUserBills = async (userId: number) => {
  return await apiFetch(`/api/Billing/user/${userId}`, {
    method: "GET",
  });
};

// Mock to fetch all bills for admin view if actual endpoint doesn't exist
export const getAllBills = async () => {
  return await apiFetch("/api/Billing", {
    method: "GET",
  });
};

export const markBillAsPaid = async (billId: number) => {
  return await apiFetch(`/api/billing/pay/${billId}`, {
    method: "PUT",
  });
};
