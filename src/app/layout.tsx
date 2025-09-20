import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/NavBar";
import QueryProvider from "@/Components/QueryProvider";
import { Toaster } from "sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Cookin'",
  description: "A platform for sharing and discovering recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={` ${geistMono.variable} antialiased`}
      >
        <NavBar />

        <QueryProvider>{children}</QueryProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
          }}
          richColors
        />
      </body>
    </html>
  );
}
