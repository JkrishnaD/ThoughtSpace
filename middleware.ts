import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_PUBLIC_ROUTE,
  protectedRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isProtectedRoutes = protectedRoutes.includes(nextUrl.pathname);

  // if (isLoggedIn && isProtectedRoutes) {
  //   if (nextUrl.pathname !== DEFAULT_LOGIN_REDIRECT) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  // }

  if (!isLoggedIn && isProtectedRoutes) {
    return Response.redirect(new URL(DEFAULT_PUBLIC_ROUTE, nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
