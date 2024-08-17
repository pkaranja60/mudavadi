"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";

// Create a client
// const queryClient = new QueryClient();

export default function AppProvider({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-center" richColors expand visibleToasts={9} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
