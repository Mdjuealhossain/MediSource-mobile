// Utility function to set a cookie (client-side only)
export const setCookie = (name, value, days = 7) => {
    if (typeof window !== "undefined") {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(
            value
        )}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
    }
};

// Utility function to get a cookie by name (client-side only)
export const getCookie = (name) => {
    if (typeof window !== "undefined") {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? decodeURIComponent(match[2]) : null;
    }
    return null;
};

// Utility function to clear a cookie (client-side only)
export const clearCookie = (name) => {
    if (typeof window !== "undefined") {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
    }
};
