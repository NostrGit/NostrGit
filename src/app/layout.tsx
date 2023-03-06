import { Header } from "@/components/ui/header";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">
        <div className="dark min-h-screen bg-white text-white dark:bg-[#0E1116]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
