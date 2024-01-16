import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
export default function NoNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <main className="">
          <div id="bg-grid">
            <div id="blur-grid"></div>
          </div>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
