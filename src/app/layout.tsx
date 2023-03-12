"use client";

import { Header } from "@/components/ui/header";
import { useIsMounted } from "@/lib/hooks/useIsMounted";
import NostrProvider from "@/lib/nostr/NostrContext";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();

  return (
    <html lang="en">
      <body className="dark">
        <NostrProvider>
          {isMounted && (
            <div className="dark min-h-screen bg-white text-white dark:bg-[#0E1116]">
              <Header />
              {children}
            </div>
          )}
        </NostrProvider>
      </body>
    </html>
  );
}
