// src/lib/password.ts
export type PasswordChecks = {
  minLength: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
};

export function validatePassword(
  password: string
): { checks: PasswordChecks; isValid: boolean } {
  const checks: PasswordChecks = {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
  return { checks, isValid: Object.values(checks).every(Boolean) };
}
