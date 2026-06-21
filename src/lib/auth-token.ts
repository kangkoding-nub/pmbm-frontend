const TOKEN_KEY = '__PMB_TOKEN_SERVICE__';

/**
 * Retrieve the raw Bearer token from localStorage.
 */
export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Persist the Bearer token to localStorage.
 */
export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Remove the Bearer token from localStorage (logout / session clear).
 */
export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

/**
 * Returns true when a token exists in localStorage.
 */
export function isAuthenticated(): boolean {
    return getToken() !== null;
}
