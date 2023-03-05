import "@/styles/globals.css";
import { Header } from "@/components/ui/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">
        <div
          style={{ minWidth: 1050 /* until we have mobile ready */ }}
          className="min-h-screen bg-white text-white dark:bg-[#0E1116]"
        >
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}