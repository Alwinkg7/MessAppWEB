import { apiFetch } from "./api";

// API endpoints missing from user prompt, adding stubs

export const getMealTypes = async () => {
  return await apiFetch("/api/MealTypes", { method: "GET" });
};

export const createMealType = async (data: any) => {
  return await apiFetch("/api/MealTypes", { method: "POST", body: JSON.stringify(data) });
};

export const getMealWindows = async () => {
  return await apiFetch("/api/MealWindows", { method: "GET" });
};

export const createMealWindow = async (data: any) => {
  return await apiFetch("/api/MealWindows", { method: "POST", body: JSON.stringify(data) });
};

export const getMealPricings = async () => {
  return await apiFetch("/api/MealPricings", { method: "GET" });
};

export const createMealPricing = async (data: any) => {
  return await apiFetch("/api/MealPricings", { method: "POST", body: JSON.stringify(data) });
};
