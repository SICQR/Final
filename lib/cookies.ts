export type CookieSetOpts = { days?: number; path?: string; secure?: boolean; sameSite?: "Lax"|"Strict"|"None" };

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}

export function setCookie(name: string, value: string, opts: CookieSetOpts = {}): void {
  if (typeof document === "undefined") return;
  const days = opts.days ?? 365;
  const path = opts.path ?? "/";
  const secure = opts.secure ? "; Secure" : "";
  const same = "; SameSite=" + (opts.sameSite ?? "Lax");
  const exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${exp.toUTCString()}; Path=${path}${secure}${same}`;
}

export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`;
}

export const COOKIE_KEYS = {
  consent: "hm_consent",
  age: "hm_age_verified"
} as const;

export function hasConsent(): boolean {
  return getCookie(COOKIE_KEYS.consent) === "all";
}
export function isAgeVerified(): boolean {
  return getCookie(COOKIE_KEYS.age) === "1";
}