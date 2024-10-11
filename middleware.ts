import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher([
//   "/sign-in(.*)",
//   "/sign-up(.*)",
//   "/",
//   "/shop",
//   "/explore",
//   "/api/auth/login",
//   "/founder",
//   "/checkout",
//   "/contact",
//   "/shop/:path*",
//   "/api/webhooks/clerk",
//   "/api/payment/initiate",
//   "/api/product",
//   "/api/product/:path*",
//   "/api/cart/",
//   "/api/order/place",
//   "/api/cart/:path*",
// ]);

// export default clerkMiddleware((auth, request) => {
//   if (!isPublicRoute(request)) {
//     auth().protect();
//   }
// });

export function middleware() {
  return;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
