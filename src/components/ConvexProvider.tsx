"use client";

import { ConvexReactClient , AuthLoading , Authenticated , Unauthenticated } from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import FullScreenLoader from "./FullScreenLoader";
import { ClerkProvider, SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return( 
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
  <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
    <Authenticated>
    {children}
    </Authenticated>
    <Unauthenticated>
    <div className="flex flex-col items-center justify-center min-h-screen">
     <SignIn routing="hash" />
    </div>
   </Unauthenticated>
   <AuthLoading>
    <FullScreenLoader label="Authenticating" />
    </AuthLoading>
    </ConvexProviderWithClerk>
    </ClerkProvider>
    )
}