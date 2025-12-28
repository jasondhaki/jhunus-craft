import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define the specific routes you want to protect
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

// 2. Add 'async' here so we can wait for auth()
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    
    // 3. Add 'await' here.
    // This unwraps the Promise so we can access userId and redirectToSignIn
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
      // Now redirectToSignIn exists and works perfectly
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};