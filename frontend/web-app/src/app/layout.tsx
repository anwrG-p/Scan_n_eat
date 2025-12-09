import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { CartProvider } from "../context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baz3it Chef",
  description: "Your smart cooking companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <div style={{ display: "flex", flex: 1 }}>
              <Sidebar />
              <main style={{ flex: 1, backgroundColor: "#f7f9fc" }}>{children}</main>
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
