/**
 * An array of routes that are accessible to the public
 * Those routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/profile",
  "/start",
  "/plugins",
  "/editor",
  "/legals/terms-of-service",
  "/legals/privacy-policy",
  "/legals/dmca-copyright",
  "/not_authorized",
  "/api/sounds",
];

/**
 * An array of routes that are used for authentication
 * Those routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

export const adminRoutes = ["/profile/admin", "/profile/admin/*"];
/**
 * The prefix for admin routes
 * Routes that start with this prefix are used for admin purposes
 * @type {string[]}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile";
