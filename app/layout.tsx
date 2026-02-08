import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";

export const metadata: Metadata = {
  title: "SEABED 粉丝站",
  description: "Seabed 游戏粉丝网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
