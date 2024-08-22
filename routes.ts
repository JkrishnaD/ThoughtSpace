/**This Bunch of routes are accescible for all the users
 * These routes doesn't need any Authentication
 * @type {string[]}
 */
export const DEFAULT_PUBLIC_ROUTE: string = "/";

/** This route will take you after the login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/home";

/** A Bunch of Routeswhich are used for the authentication.
 * These Routes will redirect the users to Home page
 * @type {string[]}
 * */
export const authRoutes:string[] = [
    "/auth/login/"
]