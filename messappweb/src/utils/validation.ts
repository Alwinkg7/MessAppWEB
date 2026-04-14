export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return "Phone number is required";
  
  // Basic validation for 10-15 digit numbers
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
    return "Please enter a valid phone number";
  }
  
  return null;
};

export const validateRequired = (value: string | number | null | undefined, fieldName: string): string | null => {
  if (value === null || value === undefined || value === "") {
    return `${fieldName} is required`;
  }
  return null;
};
