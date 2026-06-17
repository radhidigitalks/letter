import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Date Invitation 💕",
  description: "A super cute date invitation app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
