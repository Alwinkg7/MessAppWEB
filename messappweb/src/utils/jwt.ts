import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export interface CustomJwtPayload {
  nameid?: string;
  emailaddress?: string;
  role?: string;
  exp?: number;
  iss?: string;
  aud?: string;
  [key: string]: any; // Catch other claims
}

// Map the complex schema URIs to simple keys for easy access
const CLAIM_USER_ID = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
const CLAIM_EMAIL = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
const CLAIM_ROLE = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export const decodeToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwtDecode<CustomJwtPayload>(token);
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

export const extractRole = (token: string): number | null => {
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  const roleStr = decoded[CLAIM_ROLE] || decoded.role;
  return roleStr ? parseInt(roleStr as string, 10) : null;
};

export const extractUserId = (token: string): number | null => {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  const idStr = decoded[CLAIM_USER_ID] || decoded.nameid;
  return idStr ? parseInt(idStr as string, 10) : null;
};

export const extractEmail = (token: string): string | null => {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  return (decoded[CLAIM_EMAIL] || decoded.emailaddress) as string || null;
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  // exp is in seconds, convert to ms
  return decoded.exp * 1000 < Date.now();
};

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const setToken = (token: string): void => {
  // Set token to expire when the JWT expires
  const decoded = decodeToken(token);
  if (decoded && decoded.exp) {
    const expires = new Date(decoded.exp * 1000);
    Cookies.set("token", token, { expires });
  } else {
    Cookies.set("token", token);
  }
};

export const removeToken = (): void => {
  Cookies.remove("token");
};
