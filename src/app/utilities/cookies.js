// Utility function to set a cookie (client-side only)
export const setCookie = (name, value, days) => {
    if (typeof window !== "undefined") {
        // Ensure we're on the client-side
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/;`;
    }
};

// Utility function to get a cookie by name (client-side only)
export const getCookie = (name) => {
    if (typeof window !== "undefined") {
        // Ensure we're on the client-side
        const match = document.cookie.match(
            new RegExp("(^| )" + name + "=([^;]+)")
        );
        if (match) return match[2];
    }
    return null;
};

// Utility function to clear a cookie by setting max-age to 0 (client-side only)
export const clearCookie = (name) => {
    if (typeof window !== "undefined") {
        // Ensure we're on the client-side
        document.cookie = `${name}=; max-age=0; path=/;`;
    }
};
