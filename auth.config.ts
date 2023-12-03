import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isSignPage = nextUrl.pathname === '/signup';
      if (isSignPage) return true;
      const isLoggedIn = !!auth?.user;

      if (!isLoggedIn && nextUrl.pathname !== '/') {
        return Response.redirect(new URL('/', nextUrl));
      }

      // Redirect unauthenticated users to the sign-in page
      if (!isLoggedIn && nextUrl.pathname === '/') {
        return true; // Allow access to the sign-in page if not logged in
      }

      // If the user is logged in and tries to access the sign-in page, redirect them
      if (isLoggedIn && nextUrl.pathname === '/') {
        return Response.redirect(new URL('/dashboard', nextUrl)); // Redirect to the dashboard or another appropriate page
      }

      // For all other cases, allow the user to access the requested URL
      return true;
    },
  },
} satisfies NextAuthConfig;
